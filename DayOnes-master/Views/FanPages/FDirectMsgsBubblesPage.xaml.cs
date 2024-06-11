namespace DayOnes.Views;

public partial class FDirectMsgsBubblesPage : ContentPage
{
	public FDirectMsgsBubblesPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /*
          Invoke AWS API: GetDMChat
a. Pass the ChatPostID. The API will return a lot of data
         */
    }

    private void btnBack_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(FDirectMsgsPage));
    }

    private void sendButton_Tapped(object sender, TappedEventArgs e)
    {
        var message = txtMessage.Text;
        /*
         a. Pressed, collect the message passing it and the
ChatPostID and timestamp to API: SendDMMsg
b. With success, display the message in a purple
message bubble.

         */
    }
}