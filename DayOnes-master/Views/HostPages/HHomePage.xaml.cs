using System.Collections.ObjectModel;

namespace DayOnes.Views.HostPages;

public partial class HHomePage : ContentPage
{
    public static string CapturedImageResource = "";
    public static string UploadedImageResource = "";

    public HHomePage()
    {
        InitializeComponent();
        BindingContext = this;
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
    }

    private async void layoutCamera_Tapped(object sender, TappedEventArgs e)
    {
        if (MediaPicker.Default.IsCaptureSupported)
        {
            FileResult myPhoto = await MediaPicker.Default.CapturePhotoAsync();
            if (myPhoto != null)
            {
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
        await Shell.Current.GoToAsync(nameof(HSeeSelfiePage));
    }

    private async void layoutPics_Tapped(object sender, TappedEventArgs e)
    {
        if (MediaPicker.Default.IsCaptureSupported)
        {
            FileResult myPhoto = await MediaPicker.Default.PickPhotoAsync();
            if (myPhoto != null)
            {
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
        await Shell.Current.GoToAsync(nameof(HReviewPhotoPage));
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
}
