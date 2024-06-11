using DayOnes.Views.Components;
using System.Diagnostics;

namespace DayOnes.Views;

public partial class HSettingsPage : ContentPage
{


    private string FaqsUrl { get; set; }
    private string DayOnesWebUrl { get; set; }
    private string PricingUrl { get; set; }

    private bool IsSoundToggled { get; set; }
    private bool IsPushToggled { get; set; }

    public HSettingsPage()
    {
        InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /*
         To obtain the status of the switches, execute
API: GetUserNot. This will return:
i. The status of each switch. 
       (switches variables are togglePushSwitch and toggleSoundSwitch whose value are set by getting the statuses)
    Here after receiving the values of the push and sound toggle, set them as follow
        1. IsSoundToggled = SoundToggle Value received
        2. IsPushToggled = PushToggle Value received

ii. The URLs for
1. FAQs
2. DayOnes Web
3. Pricing

        Here after receiving the above-mentioned Urls, set them as follow
        1. FaqsUrl = FAQs Url received
        1. DayOnesWebUrl = DayOnesWeb Url received
        1. PricingUrl = Pricing Url received
         */

        togglePushSwitch.IsToggled = IsPushToggled;
        toggleSoundSwitch.IsToggled = IsSoundToggled;
    }

    private void OnToggled(object sender, ToggledEventArgs e)
    {

    }

    private void toggleSoundSwitch_Toggle(object sender, ToggledEventArgs e)
    {

    }

    private void togglePushSwitch_Toggle(object sender, ToggledEventArgs e)
    {

    }

    private void lblQuickStart_Tapped(object sender, TappedEventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HQuickStartPage));
    }

    private async void btnLogout_Click(object sender, EventArgs e)
    {

        var res = await DisplayAlert("Confirmation", "Do you want to quit?", "Yes", "No");
        if(res)
            await Navigation.PopToRootAsync();

        /* a.Launch a iOS Alert pop-up asking of the user really wants to quit the app
i.Yes – exit the app
ii.No - close the Alert Box *
         
         */
    }

    private void lblFAQs_Tapped(object sender, TappedEventArgs e)
    {
        try
        {
            // Launch the default browser to open the URL
            Launcher.OpenAsync(new Uri(FaqsUrl));
        }
        catch (Exception ex)
        {
            Debug.WriteLine("Error opening URL: " + ex.Message);
        }

    }

    private void lblDayOnesWeb_Tapped(object sender, TappedEventArgs e)
    {
        try
        {
            // Launch the default browser to open the URL
            Launcher.OpenAsync(new Uri(DayOnesWebUrl));
        }
        catch (Exception ex)
        {
            Debug.WriteLine("Error opening URL: " + ex.Message);
        }

    }

    private void lblPricing_Tapped(object sender, TappedEventArgs e)
    {

        try
        {
            // Launch the default browser to open the URL
            Launcher.OpenAsync(new Uri(PricingUrl));
        }
        catch (Exception ex)
        {
            Debug.WriteLine("Error opening URL: " + ex.Message);
        }
    }
}