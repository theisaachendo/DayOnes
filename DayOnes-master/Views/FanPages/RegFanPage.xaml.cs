using Microsoft.Maui.Controls;

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

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
        }

        private async void btnRegister_Click(object sender, EventArgs e)
        {
            // fields
            var fullName = this.txtFullName.Text;
            var userName = this.txtUsername.Text;
            var email = this.txtEmail.Text;
            var phone = this.txtPhone.Text;
            var password = this.txtPassword.Text;
            var confirmPassword = this.txtConfirmPassword.Text;

            Console.WriteLine("Register button clicked.");
            Console.WriteLine($"FullName: {fullName}, Username: {userName}, Email: {email}, Phone: {phone}");

            if (string.IsNullOrEmpty(fullName) || string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(email) ||
                string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmPassword))
            {
                Console.WriteLine("Validation failed: One or more fields are empty.");
                return;
            }

            if (password != confirmPassword)
            {
                Console.WriteLine("Validation failed: Password and confirm password do not match.");
                return;
            }

            await Shell.Current.GoToAsync(nameof(FHomePage));
            Console.WriteLine("Navigated to FHomePage.");

            // if user is a client then call call AWS - API: RegC1 with all the above fields
            // If the user is a Host, then they will press the Switch on this page where the
            // app will navigate to Page: Reg HOST
        }

        private async void btnCancel_Click(object sender, EventArgs e)
        {
            await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
        }
    }
}
