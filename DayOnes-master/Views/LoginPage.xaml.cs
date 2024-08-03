using DayOnes.Models;
using DayOnes.Views.HostPages;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Microsoft.Maui.Controls;
using DayOnes.UtilityClass;

namespace DayOnes.Views
{
    public partial class LoginPage : ContentPage
    {
        private WebSocketService _webSocketService;
        private const string APP_TAG = "DayOnesApp";
        private readonly HttpClient _httpClient;

        // Lambda URL for authentication
        private const string LambdaUrl = "https://2hokj4ow5etr4dw2h55tizgvpi0dusbo.lambda-url.us-east-1.on.aws/";

        public LoginPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
            Console.WriteLine($"{APP_TAG}: LoginPage initialized.");

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
                var profile = await AuthenticateUser(username, password);
                if (profile == null)
                {
                    await DisplayAlert("Login Failed", "Invalid username or password. Please try again.", "OK");
                    return;
                }

                Console.WriteLine($"{APP_TAG}: Authenticated user profile: {profile}");

                // Create D1Account from JObject
                var account = new D1Account
                {
                    Username = profile["username"]?.ToString(),
                    FullName = profile["fullName"]?.ToString(),
                    Email = profile["email"]?.ToString(),
                    Phone = profile["phone"]?.ToString(),
                    Instagram = profile["instagram"]?.ToString(),
                    ID = profile["accountID"]?.ToString(),
                    CreatedAt = DateTime.Now
                };

                // Sync account data to local storage
                await D1AccountMethods.StoreUserDataLocally(account);

                // Initialize WebSocketService with the authenticated username
                _webSocketService = new WebSocketService(username);

                // Determine user type and navigate to the appropriate page
                var role = profile["role"]?.ToString();
                var type = role == "artist" ? Models.UserTypeEnum.Host : Models.UserTypeEnum.Fan;
                Console.WriteLine($"{APP_TAG}: User role determined as: {type}");

                if (type == Models.UserTypeEnum.Host)
                {
                    Console.WriteLine($"{APP_TAG}: Navigating to HHomePage...");
                    await Shell.Current.GoToAsync(nameof(HHomePage));
                    Console.WriteLine($"{APP_TAG}: Successfully navigated to HHomePage.");
                }
                else if (type == Models.UserTypeEnum.Fan)
                {
                    Console.WriteLine($"{APP_TAG}: Navigating to FHomePage...");
                    await Shell.Current.GoToAsync(nameof(FHomePage));
                    Console.WriteLine($"{APP_TAG}: Successfully navigated to FHomePage.");
                }
                else
                {
                    Console.WriteLine($"{APP_TAG}: Unknown user role: {role}. Unable to navigate.");
                    await DisplayAlert("Error", "Unknown user role. Please contact support.", "OK");
                    return;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Login failed: {ex.Message}\nStack Trace: {ex.StackTrace}");
                await DisplayAlert("Error", "An error occurred during login. Please try again.", "OK");
            }
        }

        private async Task<JObject> AuthenticateUser(string username, string password)
        {
            try
            {
                // Make a request to the Lambda function
                var url = $"{LambdaUrl}?username={username}&password={password}";
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var jsonData = JObject.Parse(jsonResponse);

                    if (jsonData["message"]?.ToString() == "Authenticated")
                    {
                        return (JObject)jsonData["profile"];
                    }
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error during authentication: {ex.Message}\nStack Trace: {ex.StackTrace}");
                return null;
            }
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
