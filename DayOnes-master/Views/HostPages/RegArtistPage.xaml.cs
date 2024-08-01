using DayOnes.UtilityClass;
using Microsoft.Maui.Controls;
using System;
using System.IO;

namespace DayOnes.Views
{
    public partial class RegArtistPage : ContentPage
    {
        private readonly UserService _userService;

        public RegArtistPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
            Console.WriteLine("RegArtistPage initialized.");

            // Initialize UserService
            _userService = new UserService();

            // Hardcoded test to insert and retrieve an artist account
            HardcodedTest();

            // Start the logo animation
            AnimateLogo();
        }

        private void HardcodedTest()
        {
            var artistAccount = new D1Account
            {
                AccountID = "test_account_id",
                Username = "test_user",
                Password = "test_password",
                FullName = "Test User",
                License = "test_license",
                Email = "test@example.com",
                Phone = "1234567890",
                Instagram = "test_instagram",
                D1Type2 = 1,
                AcntCreatTS = DateTime.Now.ToString(),
                TOSAcpt = 1,
                TOSAcptTS = DateTime.Now.ToString(),
                DevName = "test_device",
                PremiumAcct = 1,
                FanGift = 0,
                GiftTS = DateTime.Now.ToString(),
                GPSLocationLat = 0.0,
                GPSLocationLon = 0.0,
                GPSLastTS = DateTime.Now.ToString(),
                GPSGeoHash = 0.0,
                GPSTS = DateTime.Now.ToString(),
                GPSCity = "test_city",
                HFanNotifDM = 0,
                HFanNotifD1 = 0,
                InviteTS = DateTime.Now.ToString(),
                UploadStatus = "test_status",
                UploadLatestTS = DateTime.Now.ToString(),
                HNewGrp = "test_group",
                HSignatureCount = 0,
                HPhoto270Count = 0,
                HPhoto100Count = 0,
                HInviteReset = 0,
                HInviteTS = DateTime.Now.ToString(),
                HInviteReminder = DateTime.Now.ToString(),
                HLikeCount = 0,
                NotPushOn = "yes",
                NotSndOn = "yes",
                GPSRange = 100,
                GEOHash = 123456,
                SessionId = "test_session_id",
                ChatSessionId = "test_chat_session_id",
                GroupName = "test_group_name",
                InitiatedBy = "test_initiator",
                SessionType = "test_session_type",
                CreatedAt = DateTime.Now
            };

            D1AccountMethods.InsertD1Account(artistAccount.Username, artistAccount);

            // Retrieve the inserted artist account
            var retrievedAccount = D1AccountMethods.GetD1Account(artistAccount.Username, artistAccount.ID);
            if (retrievedAccount != null)
            {
                Console.WriteLine($"Retrieved Artist Account: {retrievedAccount.FullName}, {retrievedAccount.Email}");
            }
            else
            {
                Console.WriteLine("Failed to retrieve the artist account.");
            }
        }

        private void OnToggled(object sender, ToggledEventArgs e)
        {
            Console.WriteLine("Toggle switched. New value: " + e.Value);
        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            try
            {
                Console.WriteLine("Login button clicked.");
                await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
                Console.WriteLine("Navigated to LoginPage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Navigation to LoginPage failed: {ex.Message}");
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

                // Navigate to FHomePage
                await Shell.Current.GoToAsync(nameof(FHomePage));
                Console.WriteLine("Navigated to FHomePage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Navigation to FHomePage failed: {ex.Message}");
                await DisplayAlert("Error", $"An error occurred during registration: {ex.Message}", "OK");
            }
        }

        private async void btnCancel_Click(object sender, EventArgs e)
        {
            try
            {
                Console.WriteLine("Cancel button clicked.");
                await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
                Console.WriteLine("Navigated to LoginPage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Navigation to LoginPage failed: {ex.Message}");
            }
        }

        private async void imgLogo_Tapped(object sender, EventArgs e)
        {
            try
            {
                Console.WriteLine("Logo tapped.");
                await Shell.Current.GoToAsync(nameof(MainPage));
                Console.WriteLine("Navigated to MainPage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Navigation to MainPage failed: {ex.Message}");
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
