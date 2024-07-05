using DayOnes.Models;
using DayOnes.Views.HostPages;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Microsoft.Maui.Controls;

namespace DayOnes.Views
{
    public partial class LoginPage : ContentPage
    {
        private readonly HttpClient _httpClient;

        public LoginPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
            Console.WriteLine("LoginPage initialized.");

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
                if (!result.Item1)
                {
                    await DisplayAlert("Login Failed", "Invalid username or password. Please try again.", "OK");
                    return;
                }

                var profile = result.Item2;
                // Use the profile information as needed
                Console.WriteLine("Authenticated user profile: " + profile);

                // Determine user type and navigate to the appropriate page
                UserTypeEnum type = profile["role"].ToString() == "artist" ? UserTypeEnum.Host : UserTypeEnum.Fan;
                switch (type)
                {
                    case UserTypeEnum.Host:
                        await Shell.Current.GoToAsync(nameof(HHomePage));
                        break;
                    case UserTypeEnum.Fan:
                        await Shell.Current.GoToAsync(nameof(FHomePage));
                        break;
                }
                Console.WriteLine("Navigated to appropriate home page.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login failed: {ex.Message}");
                await DisplayAlert("Error", "An error occurred during login. Please try again.", "OK");
            }
        }

        private async Task<(bool, JObject)> AuthenticateUser(string username, string password)
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

        private async void btnSignup_Click(object sender, EventArgs e)
        {
            Console.WriteLine("Signup button clicked.");
            string action = await DisplayActionSheet("Select Account Type", "Cancel", null, "Fan", "Artist");

            if (action == "Fan")
            {
                Console.WriteLine("Fan selected.");
                await Shell.Current.GoToAsync(nameof(RegFanPage));
                Console.WriteLine("Navigated to RegFanPage.");
            }
            else if (action == "Artist")
            {
                Console.WriteLine("Artist selected.");
                await Shell.Current.GoToAsync(nameof(RegArtistPage));
                Console.WriteLine("Navigated to RegArtistPage.");
            }
        }

        private void imgLogo_Tapped(object sender, EventArgs e)
        {
            Console.WriteLine("Logo tapped.");
            Shell.Current.GoToAsync(nameof(HHomePage));
            Console.WriteLine("Navigated to HHomePage.");
        }
    }
}
