using DayOnes.Models;
using DayOnes.Views.HostPages;
using System.ComponentModel;

namespace DayOnes.Views;

public partial class HSelfieChooseSigPage : ContentPage, INotifyPropertyChanged
{
    private List<SigImage> sigs;
    public static SigImage SelectedSigID = new SigImage();
    public HSelfieChooseSigPage()
    {
        InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        //Setting the selfie image 
        this.imgCaptured.Source = HHomePage.CapturedImageResource;

        BindingContext = this;

        sigs = new List<SigImage>();
        sigs.Add(new() { ID = "1", ImageSource = "sig2.png", Name = "Sig1" });
        sigs.Add(new() { ID = "2", ImageSource = "sig3.png", Name = "Sig2" });
        sigs.Add(new() { ID = "3", ImageSource = "sig2.png", Name = "Sig3" });
        sigs.Add(new() { ID = "4", ImageSource = "sig3.png", Name = "Sig4" });

        this.listSigs.ItemsSource = sigs;

        
    }

    private void btnCancel_Click(object sender, EventArgs e)
    {

        Shell.Current.GoToAsync(nameof(HSeeSelfiePage));
    }

    

    private void imgSig_Click(object sender, TappedEventArgs e)
    {
        // Cast the sender object to an Image to access its properties
        Image tappedImage = (Image)sender;

        // Access the BindingContext of the tapped Image to get the selected item
        SigImage selectedItem = (SigImage)tappedImage.BindingContext;

        // Now you can access the ID field of the selected item and store it in SelectedSigID
        //Passing whole image with has its ID as well.
        SelectedSigID = selectedItem;
        Shell.Current.GoToAsync(nameof(HFinalSeeSelfiePage));
    } 

    //private void HandleItemSelected(object sender, SelectedItemChangedEventArgs e)
    //{
    //    if (e.SelectedItem != null && e.SelectedItem is string selectedImage)
    //    {
    //        for (int i = 0; i < ImageUrls.Count; i++)
    //        {
    //            if (ImageUrls[i].Equals(selectedImage))
    //            {
    //                // Set IsSelected to true for the selected item
    //                ImageUrls[i] = selectedImage;
    //            }
    //            else
    //            {
    //                // Set IsSelected to false for other items
    //                ImageUrls[i] = null; // Or any other value that represents deselected state
    //            }
    //        }
    //    }
    //}
}