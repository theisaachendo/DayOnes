namespace DayOnes.Views;

public partial class FD1MsgsBubblesPage : ContentPage
{
    public static string ChatPostID = "";
	public FD1MsgsBubblesPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
        ChatPostID = FD1MsgsPage.ChatPostID;
        /* Invoke AWS API: GetHostPost
a. Pass the ChatPostID. The API will return a lot
of data
*/
    }

    private void btnBack_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(FD1MsgsPage));
    }

    private void sendButton_Tapped(object sender, TappedEventArgs e)
    {
        //ChatPostID is already defined

        var message = this.txtMessage.Text;
        /*
         collect the message passing it and the
ChatPostID and timestamp to API: SendD1Msg

With success, display the message in a purple
message bubble.
         */
    }

}