using DayOnes.Views.HostPages;

namespace DayOnes.Views;

public partial class HHomeUploadedPage : ContentPage
{
    private double distance = 10;
    public static string ImageName = "";
    private const double FT_TO_METER = 0.3048;

    public HHomeUploadedPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        lblFtDistance.Text = $"{Math.Round(distance, 2)} ft";
        lblMeterDistance.Text = $"{Math.Ceiling(distance * FT_TO_METER).ToString("0.00")} m";

    }

    private void sliderDistance_ValueChanged(object sender, ValueChangedEventArgs e)
    {
        distance = e.NewValue;
        lblFtDistance.Text = $"{Math.Round(distance, 2)} ft";
        lblMeterDistance.Text = $"{Math.Ceiling(distance * FT_TO_METER).ToString("0.00")} m";
    }

    private void btnSend_Click(object sender, EventArgs e)
    {
        /*a. The app sends the device’ GPS coordinates to AWS
        with API: SetMyGPS.
        i.Pass
        1.Username
        2.Lon.Lat
        3.Timestamp
        4.City

        b. Start Send Process AWS API: StartSendProc
        i. For this deliverable, comment the code with the
        location & where the data is to execute the API.
        */
        Shell.Current.GoToAsync(nameof(HHomeSentCountdownPage));
    }

    private void btnReset_Click(object sender, EventArgs e)
    {

        /*the upload area is cleared by invoking the API:
        CLRUpload.*/

        ImageName = "";
        lblImageName.Text = "";

        Shell.Current.GoToAsync(nameof(HHomePage));
    }

    private async void imgAttach_Click(object sender, TappedEventArgs e)
    {

        if (MediaPicker.Default.IsCaptureSupported)
        {
            //TAKE PHOTO OR CAPTURE PHOTO
            // FileResult myPhoto = await MediaPicker.Default.CapturePhotoAsync();

            //LOAD PHOTO
            FileResult myPhoto = await MediaPicker.Default.PickPhotoAsync();
            if (myPhoto != null)
            {
                //save the image captured in the application.
                string localFilePath = Path.Combine(FileSystem.CacheDirectory, myPhoto.FileName);
                using Stream sourceStream = await myPhoto.OpenReadAsync();

                using FileStream localFileStream = File.OpenWrite(localFilePath);
                await sourceStream.CopyToAsync(localFileStream);

                ImageName = localFilePath;
                lblImageName.Text = ImageName;
                //await Shell.Current.DisplayAlert("Success", "Image uploaded successfully", "Ok");
            }
        }
        else
        {
            await Shell.Current.DisplayAlert("OOPS", "You device isn't supported", "Ok");
        }
    }
}