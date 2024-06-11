using DayOnes.Views.HostPages;

namespace DayOnes.Views;

public partial class HSeeSelfiePage : ContentPage
{
	public HSeeSelfiePage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
        this.imgCaptured.Source = HHomePage.CapturedImageResource;
    }

    private void imgCancel_Tap(object sender, TappedEventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HHomePage));
    }

    private void imgSig_Tap(object sender, TappedEventArgs e)
    {
        //App collects the SigID#
        Shell.Current.GoToAsync(nameof(HSelfieChooseSigPage));
    }

    private void imgUpload_Tap(object sender, TappedEventArgs e)
    {
        //Need to read the image from camera.
        //the variable or stream storing the data is not specified because in the document, 
        //Input format required for the API is not specified.
        //there can be UTF Coding, Base64string or stream byte for the image posting which was not specified in the document
        
        /*a.Execute API: SendPictoUpload
        i.Comment the code for where this to be
        done and where the data is to pass to the
        API
        */
        Shell.Current.GoToAsync(nameof(HHomeUploadedPage));

    }
}