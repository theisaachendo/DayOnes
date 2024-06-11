using DayOnes.Models;
using DayOnes.Views.HostPages;

namespace DayOnes.Views;

public partial class HPageHSigPenColorEditPage : ContentPage
{
    private List<SigImage> sigs;
    public static SigImage SelectedSigID = new SigImage();
    public static string SelectedColorHex = "";
    public HPageHSigPenColorEditPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        sigs = new List<SigImage>();
        sigs.Add(new() { ID = "1", ImageSource = "sig2.png", Name = "Sig1" });
        sigs.Add(new() { ID = "2", ImageSource = "sig3.png", Name = "Sig2" });
        sigs.Add(new() { ID = "3", ImageSource = "sig2.png", Name = "Sig3" });
        sigs.Add(new() { ID = "4", ImageSource = "sig3.png", Name = "Sig4" });

        this.listSigs.ItemsSource = sigs;
    }

    private void btnSig_Click(object sender, EventArgs e)
    {

    }

    private void imgSig_Click(object sender, TappedEventArgs e)
    {

        // Cast the sender object to an Image to access its properties
        Image tappedImage = (Image)sender;

        // Access the BindingContext of the tapped Image to get the selected item
        SigImage selectedItem = (SigImage)tappedImage.BindingContext;

        this.imgEdit.Source = selectedItem.ImageSource;
        // Now you can access the ID field of the selected item and store it in SelectedSigID
        //Passing whole image with has its ID as well.
        SelectedSigID = selectedItem;
    }

    private void frmColor_Tapped(object sender, TappedEventArgs e)
    {

        Frame tappedFrame = (Frame)sender;
        
        // Get the background color of the tapped Frame as a Color object
        Color backgroundColor = tappedFrame.BackgroundColor;

        // Convert the Color object to a hexadecimal string
        SelectedColorHex = backgroundColor.ToHex();

        //SelectedColorHex is obtained from the color boxes.
        //The app should call the .net7 C# class to change all
        //pixels to a color
    }

    private void btnSave_Click(object sender, EventArgs e)
    {
        //Here developer can get Image from imgEdit.Source in a format which needed to be saved
        /*a.Saves the signature in the list of signatures in memory
        b.Execute API: AddPriSig passing the Username to save the modified
        picture at AWS*/
    }

    private void btnBack_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HAssetsNManagementPage));
    }
}