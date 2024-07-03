using DayOnes.Models;
using DayOnes.Views.HostPages;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

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
                // Authenticate the user and retrieve the role
                var result = await AuthenticateUser(username, password);
                if (!result.Item1)
                {
                    await DisplayAlert("Login Failed", "Invalid username or password. Please try again.", "OK");
                    return;
                }

                // Determine user type and navigate to the appropriate page
                UserTypeEnum type = result.Item2 == "artist" ? UserTypeEnum.Host : UserTypeEnum.Fan;
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

        private async Task<(bool, string)> AuthenticateUser(string username, string password)
        {
            // Replace with your AWS Lambda endpoint URL for authentication and role retrieval
            var url = $"arn:aws:lambda:us-east-1:274045439458:function:UserAuthenticationLogin?username={username}&password={password}";
            var response = await _httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var jsonResponse = JObject.Parse(content);
                return (true, jsonResponse["role"].ToString());
            }
            else
            {
                return (false, string.Empty);
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
