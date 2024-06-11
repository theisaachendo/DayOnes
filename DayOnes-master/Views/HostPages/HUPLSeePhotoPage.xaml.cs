using DayOnes.Views.HostPages;

namespace DayOnes.Views;

public partial class HUPLSeePhotoPage : ContentPage
{
	public HUPLSeePhotoPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        //Set Uploaded image in the image shown
        this.imgUploaded.Source = HHomePage.UploadedImageResource;

        this.imgSig.Source = HUPLPhotoChooseSigPage.SelectedSigID.ImageSource;
        string sigID = HUPLPhotoChooseSigPage.SelectedSigID.ID;
        //Invoke API: Get AllSigs100
    }

    private void btnBack_Click(object sender, EventArgs e)
    {

    }

    private void imgCancel_Tap(object sender, TappedEventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HUPLPhotoChooseSigPage));
    }

    private void imgUpload_Tap(object sender, TappedEventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HHomeUploadedPage));

    }
}