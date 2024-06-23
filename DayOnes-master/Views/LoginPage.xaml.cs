using DayOnes.Models;
using DayOnes.Views.HostPages;

namespace DayOnes.Views
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
            Console.WriteLine("LoginPage initialized.");
        }

        private void btnLog_Click(object sender, EventArgs e)
        {
            var email = this.txtEmail.Text;
            var password = this.txtPassword.Text;

            //Based on this type we decide whether the user is a host or fan
            UserTypeEnum type = UserTypeEnum.Host;
            /*
             1. Collected registration data
            2. Execute AWS API:L1 passing the Username & Password
            to AWS, and receiving data as to whether the user is a
            Client or Host. Client or Host status should be store in
            SQLite
            3. Collect the EULA Agreement Data
            ? Timestamp
            ? Boolean with agreement status
            4. Just below the previous comment, write a comment on
            EULA and detail the EULA data comment
            5. Collect Geolocation data from the iPhone, store it in
            SQLite, and ID the variable containing the data. Will need the Username as part
            of the data set.
            */

            Shell.Current.GoToAsync(nameof(FHomePage));
            Console.WriteLine("Navigated to FHomePage.");
        }

        private async void btnSignup_Click(object sender, EventArgs e)
        {
            Console.WriteLine("Signup button clicked.");
            string action = await DisplayActionSheet("Select Account Type", "Cancel", null, "Fan", "Artist");

            if (action == "Fan")
            {
                Console.WriteLine("Fan selected.");
                await Shell.Current.GoToAsync(nameof(RegFanPage));
                Console.WriteLine("Navigated to RegFanPage.");
            }
            else if (action == "Artist")
            {
                Console.WriteLine("Artist selected.");
                await Shell.Current.GoToAsync(nameof(RegArtistPage));
                Console.WriteLine("Navigated to RegArtistPage.");
            }
        }

        private void imgLogo_Tapped(object sender, TappedEventArgs e)
        {
            Console.WriteLine("Logo tapped.");
            Shell.Current.GoToAsync(nameof(HHomePage));
            Console.WriteLine("Navigated to HHomePage.");
        }
    }
}
