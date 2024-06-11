using DayOnes.Models;
using DayOnes.Views.Components;

namespace DayOnes.Views;

public partial class FD1MsgsPage : ContentPage
{
    private List<ArtistChat> chats;
    public static string ChatPostID = "";
	public FD1MsgsPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        chats = new List<ArtistChat>();
        chats.Add(new ArtistChat() { ID="1", ArtistName = "Julie", ArtistImage = "singer.png", LikeCount = "20.4k", IsLiked = true });
        chats.Add(new ArtistChat() { ID = "2", ArtistName = "Steve", ArtistImage = "singer.png", LikeCount = "20.4k", IsLiked = false });
        chats.Add(new ArtistChat() { ID = "3", ArtistName = "Tom", ArtistImage = "singer.png", LikeCount = "20.4k", IsLiked = false });
        chats.Add(new ArtistChat() { ID = "4", ArtistName = "Martyn", ArtistImage = "singer.png", LikeCount = "20.4k", IsLiked = true });
        listChats.ItemsSource = chats;

        /*
        1. Invoke API: GetD1ChatSum. The return will be a tuple
of active Host’ chats
a. The 40px profile photo of the Host
b. The Host name
c. The number of Likes the host has
i. If more than 1, then a red heart should
be displayed
d. An ChatPostID of this chat

        2. If more than 2 items is returned, the summaries should
appear in a vertically aligned scrollable list.

         */
    }

    private async void TapGestureRecognizer_Tapped(object sender, TappedEventArgs e)
    {
		await Shell.Current.GoToAsync(nameof(FD1MsgsBubblesPage));
    }

    private void chat_Tapped(object sender, EventArgs e)
    {

        ArtistChatCard tappedArtistChat = (ArtistChatCard)sender;


        ArtistChat selectedItem = (ArtistChat)tappedArtistChat.BindingContext;


        ChatPostID = selectedItem.ID;
        Shell.Current.GoToAsync(nameof(FD1MsgsBubblesPage));
    }
}