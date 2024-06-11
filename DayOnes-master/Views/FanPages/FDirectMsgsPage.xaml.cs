namespace DayOnes.Views;

public partial class FDirectMsgsPage : ContentPage
{
	public FDirectMsgsPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /*
         Invoke API: GetDMChatSum. The return will be a
tuple of active Host’ DMS
a. The 40px profile photo of the Host
b. The Host name
c. The number of Likes the host has
i. If more than 1, then a red heart should be
displayed
d. An ChatPostID of this chat
e. The app should format this per the component
in Figma & display
         */
    }

    private void FrameTapped(object sender, TappedEventArgs e)
    {
        Shell.Current.GoToAsync(nameof(FD1MsgsBubblesPage));
    }
}