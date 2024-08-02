using DayOnes.UtilityClass;
using Microsoft.Maui.Controls;
using System;

namespace DayOnes.Views
{
    public partial class RegArtistPage : ContentPage
    {
        private readonly UserService _userService;
        private const string APP_TAG = "DayOnesApp";

        public RegArtistPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
            Console.WriteLine($"{APP_TAG}: RegArtistPage initialized.");

            // Initialize UserService
            _userService = new UserService();

            // Start the logo animation
            AnimateLogo();
        }

        private void OnToggled(object sender, ToggledEventArgs e)
        {
            Console.WriteLine($"{APP_TAG}: Toggle switched. New value: {e.Value}");
        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            try
            {
                Console.WriteLine($"{APP_TAG}: Login button clicked.");
                await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
                Console.WriteLine($"{APP_TAG}: Navigated to LoginPage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Navigation to LoginPage failed: {ex.Message}");
            }
        }

        private async void btnRegister_Click(object sender, EventArgs e)
        {
            try
            {
                // Fields
                var fullName = this.txtArtistFullName.Text;
                var userName = this.txtArtistUsername.Text;
                var email = this.txtArtistEmail.Text;
                var phone = this.txtArtistPhone.Text;
                var password = this.txtArtistPassword.Text;
                var confirmPassword = this.txtArtistConfirmPassword.Text;
                var instagramHandle = this.txtArtistSocialMediaHandle.Text;

                Console.WriteLine($"{APP_TAG}: Register button clicked.");
                Console.WriteLine($"{APP_TAG}: FullName: {fullName}, Username: {userName}, Email: {email}, Phone: {phone}");

                if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(email) ||
                    string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmPassword))
                {
                    Console.WriteLine($"{APP_TAG}: Validation failed: One or more fields are empty.");
                    await DisplayAlert("Validation Failed", "Please fill in all required fields.", "OK");
                    return;
                }

                if (password != confirmPassword)
                {
                    Console.WriteLine($"{APP_TAG}: Validation failed: Password and confirm password do not match.");
                    await DisplayAlert("Validation Failed", "Password and confirm password do not match.", "OK");
                    return;
                }

                // Try to register the user
                bool isRegistered = await _userService.TryRegisterUser(userName, password, fullName, email, phone, instagramHandle, "artist");

                if (!isRegistered)
                {
                    await DisplayAlert("Username Taken", "The username is already taken. Please choose a different one.", "OK");
                    txtArtistUsername.Text = string.Empty;
                    txtArtistUsername.Focus();
                    return;
                }

                // Initialize user-specific database
                D1AccountMethods.InitializeUserDatabase(userName);

                // Store artist data in SQLite database
                var artistAccount = new D1Account
                {
                    AccountID = Guid.NewGuid().ToString(),
                    FullName = fullName,
                    Username = userName,
                    Email = email,
                    Phone = phone,
                    Password = password,
                    Instagram = instagramHandle,
                    CreatedAt = DateTime.Now
                };
                D1AccountMethods.InsertD1Account(userName, artistAccount);

                Console.WriteLine($"{APP_TAG}: Database initialized and user account inserted.");

                // Navigate to FHomePage
                await Shell.Current.GoToAsync(nameof(FHomePage));
                Console.WriteLine($"{APP_TAG}: Navigated to FHomePage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error during registration: {ex.Message}\nStack Trace: {ex.StackTrace}");
                await DisplayAlert("Error", $"An error occurred during registration: {ex.Message}", "OK");
            }
        }

        private async void btnCancel_Click(object sender, EventArgs e)
        {
            try
            {
                Console.WriteLine($"{APP_TAG}: Cancel button clicked.");
                await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
                Console.WriteLine($"{APP_TAG}: Navigated to LoginPage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Navigation to LoginPage failed: {ex.Message}");
            }
        }

        private async void imgLogo_Tapped(object sender, EventArgs e)
        {
            try
            {
                Console.WriteLine($"{APP_TAG}: Logo tapped.");
                await Shell.Current.GoToAsync(nameof(MainPage));
                Console.WriteLine($"{APP_TAG}: Navigated to MainPage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Navigation to MainPage failed: {ex.Message}");
            }
        }

        private async void OnEntryFocused(object sender, FocusEventArgs e)
        {
            var entry = sender as Entry;
            if (entry != null)
            {
                var parentFrame = entry.Parent.Parent as Frame;
                if (parentFrame != null)
                {
                    await parentFrame.ScaleTo(1.05, 200);
                    await parentFrame.FadeTo(0.8, 200);
                }
            }
        }

        private async void OnEntryUnfocused(object sender, FocusEventArgs e)
        {
            var entry = sender as Entry;
            if (entry != null)
            {
                var parentFrame = entry.Parent.Parent as Frame;
                if (parentFrame != null)
                {
                    await parentFrame.ScaleTo(1, 200);
                    await parentFrame.FadeTo(1, 200);
                }
            }
        }

        private async void AnimateLogo()
        {
            while (true)
            {
                await LogoImage.RotateTo(360, 2000); // Rotate for 2 seconds
                LogoImage.Rotation = 0; // Reset rotation
            }
        }
    }
}
