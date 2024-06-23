namespace DayOnes.Views
{
    public partial class RegArtistPage : ContentPage
    {
        public RegArtistPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
            Console.WriteLine("RegArtistPage initialized.");
        }

        private void OnToggled(object sender, ToggledEventArgs e)
        {
            Console.WriteLine("Toggle switched. New value: " + e.Value);
        }

        private async void btnLogin_Click(object sender, EventArgs e)
        {
            try
            {
                Console.WriteLine("Login button clicked.");
                await Shell.Current.GoToAsync($"///{nameof(LoginPage)}");
                Console.WriteLine("Navigated to LoginPage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Navigation to LoginPage failed: {ex.Message}");
            }
        }

        private async void btnRegister_Click(object sender, EventArgs e)
        {
            try
            {
                // fields
                var fullName = this.txtArtistFullName.Text;
                var userName = this.txtArtistUsername.Text;
                var email = this.txtArtistEmail.Text;
                var phone = this.txtArtistPhone.Text;
                var password = this.txtArtistPassword.Text;
                var confirmPassword = this.txtArtistConfirmPassword.Text;

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
            catch (Exception ex)
            {
                Console.WriteLine($"Navigation to FHomePage failed: {ex.Message}");
            }
        }

        private async void imgLogo_Tapped(object sender, EventArgs e)
        {
            try
            {
                Console.WriteLine("Logo tapped.");
                await Shell.Current.GoToAsync(nameof(MainPage));
                Console.WriteLine("Navigated to MainPage.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Navigation to MainPage failed: {ex.Message}");
            }
        }
    }
}
