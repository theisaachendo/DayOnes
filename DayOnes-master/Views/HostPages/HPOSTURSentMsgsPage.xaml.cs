using DayOnes.Models;
using DayOnes.Views.Components;

namespace DayOnes.Views;

public partial class HPOSTURSentMsgsPage : ContentPage
{
    //This is Persisted GroupName.
    public static string GroupName = "";
    List<HostPost> hostPosts;
	public HPOSTURSentMsgsPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
        HostTabBar.CurrentPage1 = 2;
        Temp.currenttabbarpage = 2;
       /* Invoke AWS API: GetHostPosts
        a.Pass the Username.The API will return a lot of
        data*/

        //this is test data. the original will be fetched from API
        hostPosts = new List<HostPost>();

        hostPosts.Add(new()
        {
            GroupName = "Chicago",
            ImageSource = "singer.png",
            PostContent = "This page summarizes a post to a group. 1. The message sent from the host 2. The summary of the clients in a scrolled list\r\n",
            LikeCount = "130",
            CommentCount = "222",
        });

        hostPosts.Add(new()
        {
            GroupName = "Chicago",
            ImageSource = "singer.png",
            PostContent = "This page summarizes a post to a group. 1. The message sent from the host 2. The summary of the clients in a scrolled list\r\n",
            LikeCount = "30",
            CommentCount = "22",
        });

        hostPosts.Add(new()
        {
            GroupName = "Chicago",
            ImageSource = "artist2.png",
            PostContent = "This page summarizes a post to a group. 1. The message sent from the host 2. The summary of the clients in a scrolled list\r\n",
            LikeCount = "301",
            CommentCount = "22",
        });

        this.listHostPosts.ItemsSource = hostPosts;
    }

    private void lblPost_Tap(object sender, TappedEventArgs e)
    {
        //Shell.Current.GoToAsync(nameof(HPostDetailsPage));
    }

    private void btnGrp_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HNewGrpPostPage));
    }

    private void btnFans_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HNewALLPostPage));
    }

    private void HostPost_Tapped(object sender, TappedEventArgs e)
    {
        HostPostContainer tappedPost = (HostPostContainer)sender;

        
        HostPost selectedItem = (HostPost)tappedPost.BindingContext;

        
        GroupName = selectedItem.GroupName;
        Shell.Current.GoToAsync(nameof(HPostDetailsPage));
    }

    private void btnMsgGrp_Click(object sender, EventArgs e)
    {

        Button tappedButton = (Button)sender;

        // Get the parent Frame of the button
        VerticalStackLayout parentFrame = (VerticalStackLayout)tappedButton.Parent;

        // Access the BindingContext of the Frame to get the Post data
        //Post selectedItem = (Post)parentFrame.BindingContext;

        HostPost selectedItem = (HostPost)parentFrame.BindingContext;


        GroupName = selectedItem.GroupName;
        Shell.Current.GoToAsync(nameof(HNewGrpPostPage));
    }
}