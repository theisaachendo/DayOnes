using DayOnes.Models;
using DayOnes.Views.Components;

namespace DayOnes.Views;

public partial class HNotificationsPage : ContentPage
{
    //Persistant Variable
    public static string ChatPostID = "";
    private List<Post> posts = new List<Post>(); //This is just a testing data


    public HNotificationsPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        posts.Add(new Post() { ArtistName = "Julie", ArtistImage = "singer.png", PostContent = "You have Received a gift!", IsPinned = true });
        posts.Add(new Post() { ArtistName = "Steve", ArtistImage = "singer.png", PostContent = "You have Received a gift!", IsPinned = false });
        posts.Add(new Post() { ArtistName = "Tom", ArtistImage = "singer.png", PostContent = "You have Received a gift!", IsPinned = false });
        posts.Add(new Post() { ArtistName = "Martyn", ArtistImage = "singer.png", PostContent = "You have Received a gift!", IsPinned = true });
        listPosts.ItemsSource = posts;

        /*Need to specify a List of object to get the data from API
         * Invoke API: GetNEWDMChatSum.The return will be a
            tuple of active Host’ DMS
            a.The 40px profile photo of the Host
            b.The Host name
            c.The number of Likes the host has
            i.If more than 1, then a red heart should be
            displayed
            d.An ChatPostID of this chat*/


        /*Need to specify a List of object to get the data from API
         * Invoke API: GetHostHID1Sum.The return will be a
            tuple of
            i.Groupname
            ii. # of new messages*/



    }

    private void fan_Tapped(object sender, EventArgs e)
    {

        PostCard tappedPost = (PostCard)sender;


        PostCard selectedItem = (PostCard)tappedPost.BindingContext;


        ChatPostID = selectedItem.ArtistName; //Any unique ID
        Shell.Current.GoToAsync(nameof(FDirectMsgsBubblesPage));
    }
}