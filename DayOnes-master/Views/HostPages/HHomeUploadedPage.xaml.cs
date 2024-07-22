using DayOnes.Views.HostPages;
using DayOnes.Views.Components;

namespace DayOnes.Views;

public partial class HHomeUploadedPage : ContentPage
{
    public double Distance { get; set; } = 10;
    public static string ImageName = "";

    public HHomeUploadedPage()
    {
        InitializeComponent();
        BindingContext = this;
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
    }

    private void btnSend_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HHomeSentCountdownPage));
    }

    private void btnReset_Click(object sender, EventArgs e)
    {
        ImageName = "";
        lblImageName.Text = "";
        Shell.Current.GoToAsync(nameof(HHomePage));
    }

    private async void imgAttach_Click(object sender, TappedEventArgs e)
    {
        if (MediaPicker.Default.IsCaptureSupported)
        {
            FileResult myPhoto = await MediaPicker.Default.PickPhotoAsync();
            if (myPhoto != null)
            {
                string localFilePath = Path.Combine(FileSystem.CacheDirectory, myPhoto.FileName);
                using Stream sourceStream = await myPhoto.OpenReadAsync();
                using FileStream localFileStream = File.OpenWrite(localFilePath);
                await sourceStream.CopyToAsync(localFileStream);

                ImageName = localFilePath;
                lblImageName.Text = ImageName;
            }
        }
        else
        {
            await Shell.Current.DisplayAlert("OOPS", "Your device isn't supported", "Ok");
        }
    }
}
