namespace DayOnes.Views;

public partial class FNotificationsPage : ContentPage
{
	public FNotificationsPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /*
         a. Invoke API: GetD1ChatSum. The return will be a tuple
of active Host’ chats
i. The 40px profile photo of the Host
ii. The Host name
iii. The number of Likes the host has
1. If more than 1, then a red heart should be
displayed
iv. An ChatPostID of this chat
v. The app should format this per the component

         */

        /*
         Invoke API: GetDMChatSum. The return will be a tuple of active Host’ DMS
a. The 40px profile photo of the Host
b. The Host name
c. The number of Likes the host has
i. If more than 1, then a red heart should be displayed
d. An ChatPostID of this chat
e. The app should format this per the component in Figma & display
         */
    }
}