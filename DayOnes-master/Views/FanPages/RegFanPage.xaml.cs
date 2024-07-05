using Microsoft.Maui.Controls;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace DayOnes.Views
{
    public partial class RegFanPage : ContentPage
    {
        private readonly HttpClient _httpClient;

        public RegFanPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });

            // Initialize HttpClient
            _httpClient = new HttpClient();
        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
        }

        private async void btnRegister_Click(object sender, EventArgs e)
        {
            // Fields
            var fullName = this.txtFullName.Text;
            var userName = this.txtUsername.Text;
            var email = this.txtEmail.Text;
            var phone = this.txtPhone.Text;
            var password = this.txtPassword.Text;
            var confirmPassword = this.txtConfirmPassword.Text;

            Console.WriteLine("Register button clicked.");
            Console.WriteLine($"FullName: {fullName}, Username: {userName}, Email: {email}, Phone: {phone}");

            if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(email) ||
                string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmPassword))
            {
                Console.WriteLine("Validation failed: One or more fields are empty.");
                await DisplayAlert("Validation Failed", "Please fill in all required fields.", "OK");
                return;
            }

            if (password != confirmPassword)
            {
                Console.WriteLine("Validation failed: Password and confirm password do not match.");
                await DisplayAlert("Validation Failed", "Password and confirm password do not match.", "OK");
                return;
            }

            // Call AWS Lambda to register the fan
            bool registrationSuccess = await RegisterFan(fullName, userName, email, phone, password);
            if (registrationSuccess)
            {
                await Shell.Current.GoToAsync(nameof(FHomePage));
                Console.WriteLine("Navigated to FHomePage.");
            }
            else
            {
                await DisplayAlert("Registration Failed", "An error occurred during registration. Please try again.", "OK");
            }
        }

        private async Task<bool> RegisterFan(string fullName, string userName, string email, string phone, string password)
        {
            try
            {
                var url = $"https://y7owu4h5aixdy4zvqxpabpvdbm0ilbnw.lambda-url.us-east-1.on.aws/?Username={Uri.EscapeDataString(userName)}&Password={Uri.EscapeDataString(password)}&FullName={Uri.EscapeDataString(fullName)}&Email={Uri.EscapeDataString(email)}&Phone={Uri.EscapeDataString(phone)}&Role=fan";
                var response = await _httpClient.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                if (response.StatusCode == System.Net.HttpStatusCode.Created)
                {
                    Console.WriteLine("Registration successful: " + content);
                    return true;
                }
                else
                {
                    Console.WriteLine("Registration failed: " + content);
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during RegisterFan: {ex.Message}");
                return false;
            }
        }

        private async void btnCancel_Click(object sender, EventArgs e)
        {
            await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
        }
    }
}
