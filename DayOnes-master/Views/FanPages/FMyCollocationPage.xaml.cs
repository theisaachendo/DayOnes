namespace DayOnes.Views;

public partial class FMyCollocationPage : ContentPage
{
	public FMyCollocationPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        /*
          Execute API: GetMyColls
a. Photos will be returned from the API and set to imageViewer.itemsource 
        (Need to implement the Image model as per Image received)

        b. If no photos are available
i. launch an Alert box indicating the Collection is not
available at this time
ii. When the user presses OK in the Alert Box,
navigate to Page F-HOME
         */


        var images = new List<Im>();//This is just testing data
        images.Add(new Im() { Source = "im2.png" });
        images.Add(new Im() { Source = "im1.PNG" });
        images.Add(new Im() { Source = "im3.png" });
        images.Add(new Im() { Source = "d1logo3.png" });
        images.Add(new Im() { Source = "im2.png" });
        images.Add(new Im() { Source = "im1.PNG" });
        images.Add(new Im() { Source = "im2.png" });
        images.Add(new Im() { Source = "im1.PNG" });
        images.Add(new Im() { Source = "im3.png" });
        images.Add(new Im() { Source = "d1logo3.png" });
        images.Add(new Im() { Source = "im3.png" });
        images.Add(new Im() { Source = "d1logo3.png" });
        imageViewer.ItemsSource = images;
	}

    private void OnImageTapped(object sender, TappedEventArgs e)
    {
        //Image Id is passed to the FMyPicsLrgPage to show the tapped image
        Shell.Current.GoToAsync(nameof(FMyPicsLrgPage));
    }
}
public class Im
{
	public string Source { get; set; }
}