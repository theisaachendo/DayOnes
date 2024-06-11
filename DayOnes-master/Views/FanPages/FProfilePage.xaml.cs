namespace DayOnes.Views;

public partial class FProfilePage : ContentPage
{
	public FProfilePage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /* Receive this information by invoking the API: GetUserProf
passing the Username from SQLite.
a. API returns
i. Username – Cannot be changed ever
ii. Email
iii. Phone number (Intl format)
iv. Password
v. 50px circular Profile pic*/
    }

    private void btnAddChange_Click(object sender, EventArgs e)
    {
        /*
         * Add/Change button – the app should open up the device photo library
(simulated in Figma). When they choose a photo, the picture should
change to what the user chose, formatted to a 50px round formatted
photo.
        **/
    }

    private void btnCancel_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(FHomePage));
    }

    private void btnSave_Click(object sender, EventArgs e)
    {
        var username = txtUsername.Text;
        var email = txtEmail.Text;
        var usernameOrEmail = txtUsernameOrEmail.Text;
        var currentPassword = txtCurrentPassword.Text;
        var newPassword = txtNewPassword.Text;
        var confirmPassword = txtConfirmPassword.Text;

        /*
         only be available if the user has made a change as
specific in the previous section:
a. If so, update SQLite and execute API: UpdUserProf.
i. For now
1. Update SQLite
2. Comment on where the API call should occur and where the
data is to send to AWS.
b. When complete, navigate to Page F-HOME
         */
        Shell.Current.GoToAsync(nameof(FHomePage));

    }
}