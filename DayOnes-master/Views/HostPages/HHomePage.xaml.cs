using Microsoft.Maui.Controls;
using System;
using System.Threading.Tasks;

namespace DayOnes.Views.HostPages
{
    public partial class HHomePage : ContentPage
    {
        private double distance = 10;
        private string option = "";
        public static string CapturedImageResource = "";
        public static string UploadedImageResource = "";
        private const double FT_TO_METER = 0.3048;

        public HHomePage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });

            lblFtDistance.Text = $"0";
            lblMeterDistance.Text = $"0";
        }

        private void sliderDistance_ValueChanged(object sender, ValueChangedEventArgs e)
        {
            distance = e.NewValue;
            lblFtDistance.Text = $"{Convert.ToInt32(distance)}";
            lblMeterDistance.Text = $"{Convert.ToInt32(distance * FT_TO_METER)}";
        }

        private async void layoutCamera_Tapped(object sender, TappedEventArgs e)
        {
            if (MediaPicker.Default.IsCaptureSupported)
            {
                // Take photo or capture photo
                FileResult myPhoto = await MediaPicker.Default.CapturePhotoAsync();
                if (myPhoto != null)
                {
                    // Save the image captured in the application.
                    string localFilePath = Path.Combine(FileSystem.CacheDirectory, myPhoto.FileName);
                    using Stream sourceStream = await myPhoto.OpenReadAsync();

                    CapturedImageResource = localFilePath;

                    using FileStream localFileStream = File.OpenWrite(localFilePath);
                    await sourceStream.CopyToAsync(localFileStream);
                }
            }
            else
            {
                await Shell.Current.DisplayAlert("OOPS", "Your device isn't supported", "Ok");
            }
            // Invoke the device camera to take a selfie
            Shell.Current.GoToAsync(nameof(HSeeSelfiePage));
        }

        private async void layoutPics_Tapped(object sender, TappedEventArgs e)
        {
            if (MediaPicker.Default.IsCaptureSupported)
            {
                // Load photo
                FileResult myPhoto = await MediaPicker.Default.PickPhotoAsync();
                if (myPhoto != null)
                {
                    // Save the image captured in the application.
                    string localFilePath = Path.Combine(FileSystem.CacheDirectory, myPhoto.FileName);
                    using Stream sourceStream = await myPhoto.OpenReadAsync();

                    UploadedImageResource = localFilePath;

                    using FileStream localFileStream = File.OpenWrite(localFilePath);
                    await sourceStream.CopyToAsync(localFileStream);
                }
            }
            else
            {
                await Shell.Current.DisplayAlert("OOPS", "Your device isn't supported", "Ok");
            }
            // This opens the device photo libraries where the user picks a photo
            Shell.Current.GoToAsync(nameof(HReviewPhotoPage));
        }

        private void CollectionView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (e.CurrentSelection.FirstOrDefault() is Label selectedItem)
            {
                selecteditemaa.Text = selectedItem.Text.ToString();
                expandedtab.IsExpanded = false;
            }
        }

        private async void Expander_ExpandedChanged(object sender, CommunityToolkit.Maui.Core.ExpandedChangedEventArgs e)
        {
            if (e.IsExpanded)
                await imageproperty.RotateTo(180, 500);
            else
                await imageproperty.RotateTo(-180, 500);
        }

        private async void btnStartEvent_Click(object sender, EventArgs e)
        {
            await Shell.Current.GoToAsync(nameof(StartEventPage));
        }

        private void btnClickSelfie_Click(object sender, EventArgs e)
        {
            Console.WriteLine("Click Selfie button clicked.");
            // Add logic to capture selfie
        }

        private void btnUploadImage_Click(object sender, EventArgs e)
        {
            Console.WriteLine("Upload Image button clicked.");
            // Add logic to upload image
        }

        private async void btnSendInvite_Click(object sender, EventArgs e)
        {
            Console.WriteLine("Send Invite button clicked.");
            // Add logic to send the invite with the selected content
            await SendInvite();
        }

        private async Task SendInvite()
        {
            try
            {
                // Implement the logic to send the invite to nearby fans
                // This would include capturing any attached content (selfie or uploaded image)

                Console.WriteLine("Invite sent successfully.");
                await DisplayAlert("Success", "Your invite has been sent!", "OK");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending invite: {ex.Message}");
            }
        }

        private void btnSendInviteMain_Click(object sender, EventArgs e)
        {
            // Logic to send invite without additional content
            SendInvite();
        }
    }
}
