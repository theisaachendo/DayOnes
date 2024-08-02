using DayOnes.Models;
using DayOnes.Views.HostPages;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Microsoft.Maui.Controls;
using DayOnes.UtilityClass;
using System;

namespace DayOnes.Views
{
    public partial class LoginPage : ContentPage
    {
        private readonly HttpClient _httpClient;
        private WebSocketService _webSocketService;
        private const string APP_TAG = "DayOnesApp";

        public LoginPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
            Console.WriteLine($"{APP_TAG}: LoginPage initialized.");

            // Initialize HttpClient
            _httpClient = new HttpClient();
        }

        private async void btnLog_Click(object sender, EventArgs e)
        {
            var username = this.txtEmail.Text;
            var password = this.txtPassword.Text;

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                await DisplayAlert("Validation Failed", "Please enter both username and password.", "OK");
                return;
            }

            try
            {
                // Authenticate the user and retrieve the profile
                var result = await AuthenticateUser(username, password);
                if (!result.Item1 || result.Item2 == null)
                {
                    await DisplayAlert("Login Failed", "Invalid username or password. Please try again.", "OK");
                    return;
                }

                var profile = result.Item2;
                Console.WriteLine($"{APP_TAG}: Authenticated user profile: {profile}");

                // Initialize WebSocketService with the authenticated username
                _webSocketService = new WebSocketService(username);

                // Copy the database from the local directory to the device
                D1AccountMethods.CopyDatabaseToDevice(username);

                // Sync account data to local SQLite database on the device
                await SyncAccountData(profile);

                // Determine user type and navigate to the appropriate page
                UserTypeEnum type = profile["role"]?.ToString() == "artist" ? UserTypeEnum.Host : UserTypeEnum.Fan;
                switch (type)
                {
                    case UserTypeEnum.Host:
                        await Shell.Current.GoToAsync(nameof(HHomePage));
                        Console.WriteLine($"{APP_TAG}: Navigated to HHomePage.");
                        break;
                    case UserTypeEnum.Fan:
                        await Shell.Current.GoToAsync(nameof(FHomePage));
                        Console.WriteLine($"{APP_TAG}: Navigated to FHomePage.");
                        break;
                }

                Console.WriteLine($"{APP_TAG}: Navigated to appropriate home page.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Login failed: {ex.Message}\nStack Trace: {ex.StackTrace}");
                await DisplayAlert("Error", "An error occurred during login. Please try again.", "OK");
            }
        }

        private async Task<(bool, JObject)> AuthenticateUser(string username, string password)
        {
            try
            {
                // Replace with your AWS Lambda endpoint URL for authentication and profile retrieval
                var url = $"https://2hokj4ow5etr4dw2h55tizgvpi0dusbo.lambda-url.us-east-1.on.aws/?username={username}&password={password}";
                var response = await _httpClient.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var jsonResponse = JObject.Parse(content);
                    return (true, (JObject)jsonResponse["profile"]);
                }
                else
                {
                    return (false, null);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error during authentication: {ex.Message}\nStack Trace: {ex.StackTrace}");
                return (false, null);
            }
        }

        private async Task SyncAccountData(JObject profile)
        {
            if (profile == null)
            {
                Console.WriteLine($"{APP_TAG}: Profile is null, cannot sync account data.");
                return;
            }

            var account = new D1Account
            {
                AccountID = profile["accountID"]?.ToString(),
                FullName = profile["fullName"]?.ToString(),
                Username = profile["username"]?.ToString(),
                Email = profile["email"]?.ToString(),
                Phone = profile["phone"]?.ToString(),
                Password = profile["password"]?.ToString(),
                Instagram = profile["instagram"]?.ToString(),
                CreatedAt = DateTime.Parse(profile["createdAt"]?.ToString() ?? DateTime.Now.ToString())
            };

            await Task.Run(() => D1AccountMethods.InsertD1Account(account.Username, account));
            Console.WriteLine($"{APP_TAG}: Account data synchronized.");
        }

        private async void btnSignup_Click(object sender, EventArgs e)
        {
            Console.WriteLine($"{APP_TAG}: Signup button clicked.");
            string action = await DisplayActionSheet("Select Account Type", "Cancel", null, "Fan", "Artist");

            if (action == "Fan")
            {
                Console.WriteLine($"{APP_TAG}: Fan selected.");
                await Shell.Current.GoToAsync(nameof(RegFanPage));
                Console.WriteLine($"{APP_TAG}: Navigated to RegFanPage.");
            }
            else if (action == "Artist")
            {
                Console.WriteLine($"{APP_TAG}: Artist selected.");
                await Shell.Current.GoToAsync(nameof(RegArtistPage));
                Console.WriteLine($"{APP_TAG}: Navigated to RegArtistPage.");
            }
        }

        private void imgLogo_Tapped(object sender, EventArgs e)
        {
            Console.WriteLine($"{APP_TAG}: Logo tapped.");
            Shell.Current.GoToAsync(nameof(HHomePage));
            Console.WriteLine($"{APP_TAG}: Navigated to HHomePage.");
        }
    }
}
