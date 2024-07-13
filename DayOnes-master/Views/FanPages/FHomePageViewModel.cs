using System.Windows.Input;
using Microsoft.Maui.Controls;

namespace DayOnes.ViewModels
{
    public class FHomePageViewModel : BindableObject
    {
        public ICommand ReceiveInvitesCommand { get; }

        public FHomePageViewModel()
        {
            ReceiveInvitesCommand = new Command(OnReceiveInvites);
        }

        private async void OnReceiveInvites()
        {
            // Collect GeoLocation from the phone
            // a. Save in SQLite
            // b. Send to AWS with API: AcntGeoLoc
            // Navigate to: F - HOMECountdown
            await Shell.Current.GoToAsync(nameof(DayOnes.Views.FHomeCountdownPage));
        }
    }
}
