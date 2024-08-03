using DayOnes.Views.HostPages;
using System;
using System.IO;
using System.Threading.Tasks;
using DayOnes.UtilityClass;
using Microsoft.Maui.Controls;
using Microsoft.Maui.Media;

namespace DayOnes.Views
{
    public partial class HProfilePage : ContentPage
    {
        private string _username;

        public HProfilePage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });

            // Load profile data from local storage
            LoadProfileData();
        }

        private void LoadProfileData()
        {
            try
            {
                var profile = D1AccountMethods.GetLocalUserData();

                if (profile != null)
                {
                    txtUsername.Text = profile.Username;
                    txtEmail.Text = profile.Email;
                    txtUsernameOrEmail.Text = profile.Phone;
                    txtCurrentPassword.Text = profile.Password; // Normally passwords shouldn't be displayed directly

                    // Load profile image if stored locally
                    string profileImagePath = profile.ProfileImagePath;
                    if (!string.IsNullOrEmpty(profileImagePath) && File.Exists(profileImagePath))
                    {
                        imgProfile.Source = ImageSource.FromFile(profileImagePath);
                    }
                }
                else
                {
                    DisplayAlert("Error", "Failed to load profile data.", "OK");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading profile: {ex.Message}");
                DisplayAlert("Error", "An error occurred while loading the profile.", "OK");
            }
        }

        private async void btnAddChange_Click(object sender, EventArgs e)
        {
            if (MediaPicker.Default.IsCaptureSupported)
            {
                // LOAD PHOTO
                FileResult myPhoto = await MediaPicker.Default.PickPhotoAsync();
                if (myPhoto != null)
                {
                    // Save the image captured in the application
                    string localFilePath = Path.Combine(FileSystem.CacheDirectory, myPhoto.FileName);
                    using Stream sourceStream = await myPhoto.OpenReadAsync();

                    // Save image locally
                    using FileStream localFileStream = File.OpenWrite(localFilePath);
                    await sourceStream.CopyToAsync(localFileStream);

                    // Update the image source
                    imgProfile.Source = ImageSource.FromFile(localFilePath);

                    // Update the profile image path in local storage
                    Preferences.Set("ProfileImagePath", localFilePath);
                    D1AccountMethods.UpdateProfileImagePath(_username, localFilePath);
                }
            }
            else
            {
                await DisplayAlert("OOPS", "Your device isn't supported", "OK");
            }
        }

        private async void btnSave_Click(object sender, EventArgs e)
        {
            try
            {
                var email = txtEmail.Text;
                var phone = txtUsernameOrEmail.Text;
                var currentPassword = txtCurrentPassword.Text;
                var newPassword = txtNewPassword.Text;
                var confirmPassword = txtConfirmPassword.Text;

                // Validate inputs
                if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(phone))
                {
                    await DisplayAlert("Validation Failed", "Email and phone number cannot be empty.", "OK");
                    return;
                }

                if (!string.IsNullOrEmpty(newPassword) && newPassword != confirmPassword)
                {
                    await DisplayAlert("Validation Failed", "New passwords do not match.", "OK");
                    return;
                }

                // Update profile in local storage
                var updatedProfile = new D1Account
                {
                    Username = _username,
                    Email = email,
                    Phone = phone,
                    Password = !string.IsNullOrEmpty(newPassword) ? newPassword : currentPassword,
                    ProfileImagePath = Preferences.Get("ProfileImagePath", string.Empty)
                };

                await D1AccountMethods.StoreUserDataLocally(updatedProfile);

                // Placeholder for API call to update the profile in AWS
                // await ApiService.UpdateUserProfile(updatedProfile);

                await DisplayAlert("Success", "Profile updated successfully.", "OK");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating profile: {ex.Message}");
                await DisplayAlert("Error", "An error occurred while updating the profile.", "OK");
            }
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            // Navigate back or reset changes
        }

        private void btnSig_Click(object sender, EventArgs e)
        {
            Shell.Current.GoToAsync(nameof(HAssetsNManagementPage));
        }
    }
}
