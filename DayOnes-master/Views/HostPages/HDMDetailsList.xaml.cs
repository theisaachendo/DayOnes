using DayOnes.Models;

namespace DayOnes.Views.HostPages;

public partial class HDMDetailsList : ContentPage
{
    public static string ClientID = "";
    public static string GroupName = "";
    public static string PanState = "_";

    private bool pinned = false; 
    private List<Post> posts = new List<Post>(); //This is just a testing data

    public HDMDetailsList()
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

        ClientID = HPostDetailsPage.ClientID; 
        GroupName = HPostDetailsPage.GroupName; 
       /* Execute API: GetDMThreads passing the groupname to
        it
        a.It will return detailed data in a tuple for each DM*/
    }

    private void btnBack_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HPostDetailsPage));

    }

    private void btnDM_Click(object sender, TappedEventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HDMDetailsPage));
    }

    private void imgPin_Tapped(object sender, EventArgs e)
    {
        pinned = !pinned;
        PanState = pinned ? "1" : "_";
    }

    private void imgFan_Tapped(object sender, EventArgs e)
    {
        //Variables
        //1. ClientID
        //2. GroupName
        //3. PanState
        Shell.Current.GoToAsync(nameof(FDirectMsgsPage));
    }
}