namespace DayOnes.Views;

public partial class HNewALLPostPage : ContentPage
{
	public HNewALLPostPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /*a.Date of MMDD collected from the time on device
        b.City is “ALL”
        c.Once formulated pass this to API:
        CopyALGrpsToNewGrp*/
    }

    private void btnBack_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HPOSTURSentMsgsPage));
    }

    private void sendButton_Tapped(object sender, TappedEventArgs e)
    {
        /*The Send icon on the far right
        1.Get a new ChatPostID from API: GetNewPostID
        2.Pressed, collect the message passing it and the ChatPostID
        and timestamp to API: SendD1Msg
        3.With success, display the message in a purple message
        bubble.*/
    }
}