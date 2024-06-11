using DayOnes.Models;
using DayOnes.Views.Components;
using DayOnes.Views.HostPages;

namespace DayOnes.Views;

public partial class HPostDetailsPage : ContentPage
{
    //Persisting Property for GroupName
    public static string GroupName = "";

    //Persisting Property for ClientID
    public static string ClientID = "";

    private List<Post> posts = new List<Post>(); //This is just a testing data
		
	public HPostDetailsPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        posts.Add(new Post() { ArtistName = "Julie", ArtistImage = "singer.png", PostContent = "You have Received a gift!", IsLiked= true });
        posts.Add(new Post() { ArtistName = "Steve", ArtistImage = "singer.png", PostContent = "You have Received a gift!", IsLiked = false });
        posts.Add(new Post() { ArtistName = "Tom", ArtistImage = "singer.png", PostContent = "You have Received a gift!", IsLiked = false });
        posts.Add(new Post() { ArtistName = "Martyn", ArtistImage = "singer.png", PostContent = "You have Received a gift!", IsLiked = true });
        listPosts.ItemsSource = posts;

        //Getting the groupName from previous page
        GroupName = HPOSTURSentMsgsPage.GroupName;

        /*a.From the previous page, the Groupname should be
            persisted.
            i.Invoke API: GetHostPostDetailGRP.
            b.Set up the Groupname graphic with the data returned
            by the API
            c.Collect the initial post by the Host and display it.
            d.The API return will also include be a tuple of active
            Host’ DM chats. The data includes:
                    i.The 40px profile photo of the Client
            ii.The Cleint name
            iii.A like button if the client liked you
            iv.Three lines of the latest message from them
            v.An ChatPostID of this chat
            vi.The app should format this per the component
            in Figma & display*/
    }

    private void btnBack_Click(object Artist, EventArgs e)
    {

        Shell.Current.GoToAsync(nameof(HPOSTURSentMsgsPage));
    }


    private void bntMsgGrp_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HNewGrpPostPage));
    }

    

    private void btnDM_Click(object sender, EventArgs e)
    {

        // Cast the sender to a Button
        Button tappedButton = (Button)sender;

        // Get the parent Frame of the button
        VerticalStackLayout parentFrame = (VerticalStackLayout)tappedButton.Parent;

        // Access the BindingContext of the Frame to get the Post data
        Post selectedItem = (Post)parentFrame.BindingContext;

        // Now you can use the data from selectedItem as needed
        GroupName = selectedItem.ArtistName; // Assuming ArtistName is a property of the Post class

        // Navigate to another page or perform other actions using the post data
        Shell.Current.GoToAsync(nameof(HDMDetailsList));
    }
}