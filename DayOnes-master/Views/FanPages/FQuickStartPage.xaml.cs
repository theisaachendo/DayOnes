namespace DayOnes.Views;

public partial class FQuickStartPage : ContentPage
{
	public FQuickStartPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
        //Invoke API: GetCLQSG receiving a URL
    }

    private void btnBack_Click(object sender, EventArgs e)
    {
		Shell.Current.GoToAsync(nameof(FSettingsPage));
    }

    private void OnImage_Tap(object sender, TappedEventArgs e)
    {
        //Fan/client graphic, open the device default
        //browser passing the URS to the browser
    }
}