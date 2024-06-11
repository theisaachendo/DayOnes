namespace DayOnes.Views;

public partial class FMyPicsLrgPage : ContentPage
{
	public FMyPicsLrgPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /*
         1. Get the ID of the photo chosen to the API: GetPhoto270 &
execute
        2. Once received, display the photo
         */
    }

    private void EmailRadioButton_CheckedChanged(object sender, CheckedChangedEventArgs e)
    {
        this.imgSelected2.IsVisible = false;
        this.imgSelected3.IsVisible = false;
        this.imgSelected1.IsVisible = true;
    }

    private void DeviceRadioButton_CheckedChanged(object sender, CheckedChangedEventArgs e)
    {

        this.imgSelected2.IsVisible = true;
        this.imgSelected3.IsVisible = false;
        this.imgSelected1.IsVisible = false;
    }

    private void TextRadioButton_CheckedChanged(object sender, CheckedChangedEventArgs e)
    {
        this.imgSelected2.IsVisible = false;
        this.imgSelected3.IsVisible = true;
        this.imgSelected1.IsVisible = false;

    }

    private void onSend_Tapped(object sender, TappedEventArgs e)
    {
        /*
         * The same method is used in all 3 send button image. so need to identify by EventArgs which option is tapped.
         When the user chooses an item and presses the send
icon, the following is to occur:
a. Email – the iOS Mail app should open with the photo in
the body of the email ready to be sent to the person of
the users choosing.
b. iOS photo library – the app should add the photo to the
device photo library.
c. SMS Text – the device messages app should open with
the photo library in the next message to send. The user
will have to choose who this is being sent to.
         */
    }
}