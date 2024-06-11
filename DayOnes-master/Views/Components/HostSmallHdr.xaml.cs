namespace DayOnes.Views.Components;

public partial class HostSmallHdr : ContentView
{
	public HostSmallHdr()
	{
		InitializeComponent();
	}

    private void imgProfile_Click(object sender, TappedEventArgs e)
    {

        Shell.Current.GoToAsync(nameof(HProfilePage));
    }
}