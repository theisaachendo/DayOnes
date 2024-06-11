namespace DayOnes.Views;

public partial class HNewGrpPostPage : ContentPage
{
    private string GroupName = "";
	public HNewGrpPostPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        GroupName = HPOSTURSentMsgsPage.GroupName;
                
        /*From the Groupname persisted in the previous step,
        create a new group name in the format of
        a.Date of MMDD collected from the time on device
        b.Name of the City from the previous group name.
        c.Once formulated pass this to API:
        CopyGrpToNewGrp*/

    }

    private void btnBack_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HPOSTURSentMsgsPage));
    }

    private void sendButton_Tapped(object sender, TappedEventArgs e)
    {
       /* 1.Get a new ChatPostID from API: GetNewPostID
        2.Pressed, collect the message passing it and the ChatPostID
        and timestamp to API: SendD1Msg
        3.With success, display the message in a purple message
        bubble.*/
    }
}