
namespace DayOnes.Views;

public partial class FMessageReceivedPage : ContentPage
{
	public FMessageReceivedPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /*
        Call AWS API: GiftsReceived
a.Returns True, put up an item in a vertical List view that
the user has received a gift*/

        var messages = new List<Message>() //This is just a testing data
		{
			new Message() {Artist="Artist", Title="You have Received a gift!"},
			new Message() {Artist="Artist", Title="You have Received a gift!"},
			new Message() {Artist="Artist", Title="You have Received a gift!"}
		};
		listMessages.ItemsSource = messages;
	}

    private void btnAccept_Click(object sender, EventArgs e)
    {
        /*1.  Execute API: GiftAcpt 
         * (It is not clear the model for the messages received and 
         * the object which GiftAcpt API receives. 
         * First it is required to get the object which will be passed to the GiftAcpt API then we can get that data from UI components)
 
        
        2.Pause for 1 second
 3.Navigate to: Page - F - MyCollocations*/

        // Add a one-second delay
         Task.Delay(1000);
        Shell.Current.GoToAsync(nameof(FMyCollocationPage));
    }

    private void btnIgnore_Click(object sender, EventArgs e)
    {


        //– navigate to Page F-HOME
        Shell.Current.GoToAsync(nameof(FHomePage));
    }

}

public class Message
{
	public string Artist { get; set; }
	public string Title { get; set; }
}