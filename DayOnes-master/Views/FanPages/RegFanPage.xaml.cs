

namespace DayOnes.Views;

public partial class RegFanPage : ContentPage
{

    private bool _isHost;

    public RegFanPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
    }

   

    private void OnToggled(object sender, ToggledEventArgs e)
    {
        //Invert the field on toggle
        _isHost = !_isHost;

        // PWR: If Toggle is ON, naviagte to the Host Registration Page (Yet to be ported)
    }

    /*
     * public Window1()
{
    InitializeComponent();
    ????this.Loaded += new RoutedEventHandler(Window1_Loaded);
    toggleButton.Checked += new RoutedEventHandler(toggleButton_Checked);
    toggleButton.Unchecked += new RoutedEventHandler(toggleButton_Unchecked);
}

        private void toggleButton_Checked(object sender, RoutedEventArgs e)
        {
            ToggleButton button = (ToggleButton)sender;
            button.Background = Brushes.Aqua;
        }

        private void toggleButton_Unchecked(object sender, RoutedEventArgs e)
        {
            ToggleButton button = (ToggleButton)sender;
            button.Background = Brushes.Red;
        }
    */


    private async void btnLogin_Click(object sender, EventArgs e)
    {
        await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
    }

    private void btnRegister_Click(object sender, EventArgs e)
    {
        //fields
        var fullName = this.txtFullName.Text;
        var userName = this.txtUsername.Text;
        var email = this.txtEmail.Text;
        var phone = this.txtPhone.Text;
        var password = this.txtPassword.Text;
        var confirmPassword = this.txtConfirmPassword.Text;

        Shell.Current.GoToAsync(nameof(FHomePage));

        //if user is a client then call call AWS - API: RegC1 with all the above fields
//        If the user is a Host, then they will press the Switch on this page where the
//app will navigate to Page: Reg HOST
    }
}