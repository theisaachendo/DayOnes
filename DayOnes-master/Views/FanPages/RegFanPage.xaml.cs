namespace DayOnes.Views
{
    public partial class RegFanPage : ContentPage
    {
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
            // Invert the field on toggle
        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
        }

        private void btnRegister_Click(object sender, EventArgs e)
        {
            // fields
            var fullName = this.txtFullName.Text;
            var userName = this.txtUsername.Text;
            var email = this.txtEmail.Text;
            var phone = this.txtPhone.Text;
            var password = this.txtPassword.Text;
            var confirmPassword = this.txtConfirmPassword.Text;

            Shell.Current.GoToAsync(nameof(FHomePage));

            // if user is a client then call call AWS - API: RegC1 with all the above fields
            // If the user is a Host, then they will press the Switch on this page where the
            // app will navigate to Page: Reg HOST
        }
    }
}
