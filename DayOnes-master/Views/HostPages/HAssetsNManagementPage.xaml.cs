using DayOnes.Models;
using System.Collections.ObjectModel;

namespace DayOnes.Views.HostPages;

public partial class HAssetsNManagementPage : ContentPage
{
    public static SigImage SelectedSig = new SigImage();
    public static SigImage SelectedImg = new SigImage();

    public string imageSource = "";
    public string sigSource = "";

    private ObservableCollection<SigImage> sigs;
    private ObservableCollection<SigImage> imgs;

    public HAssetsNManagementPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });


        sigs = new ObservableCollection<SigImage>();
        sigs.Add(new SigImage() { ID = "1", ImageSource = "sig2.png", Name = "Sig1" });
        sigs.Add(new SigImage() { ID = "2", ImageSource = "sig3.png", Name = "Sig2" });
        sigs.Add(new SigImage() { ID = "3", ImageSource = "sig2.png", Name = "Sig3" });
        sigs.Add(new SigImage() { ID = "4", ImageSource = "sig3.png", Name = "Sig4" });
        sigs.Add(new SigImage() { ID = "5", ImageSource = "sig2.png", Name = "Sig1" });
        sigs.Add(new SigImage() { ID = "6", ImageSource = "sig3.png", Name = "Sig2" });

        this.listSigs.ItemsSource = sigs;


        imgs = new ObservableCollection<SigImage>();
        imgs.Add(new SigImage() { ID = "1", ImageSource = "singer.png", Name = "Sig1" });
        imgs.Add(new SigImage() { ID = "2", ImageSource = "singer.png", Name = "Sig2" });
        imgs.Add(new SigImage() { ID = "3", ImageSource = "singer.png", Name = "Sig3" });
        imgs.Add(new SigImage() { ID = "4", ImageSource = "artist1.png", Name = "Sig4" });

        this.listImgs.ItemsSource = imgs;

        //a.Execute API: GetPrivPhotos passing the
        //Username to receive the photos from AWS
        //i.Each will have an ID#
        //b.Execute API: GetPrivSig passubg the Username to receive the signature
        //photos from AWS
        //i.Each will have an ID#
    }

    private void btnBack_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HProfilePage));
    }

    private void btnSigColor_Click(object sender, EventArgs e)
    {

        Shell.Current.GoToAsync(nameof(HPageHSigPenColorEditPage));
    }

    private void imgSig_Click(object sender, TappedEventArgs e)
    {
        Image tappedImage = (Image)sender;
        string sourcePath = (tappedImage.Source as FileImageSource)?.File;

        SelectedSig = sigs.FirstOrDefault(x=>x.ImageSource == sourcePath);


    }

    private void imgImg_Click(object sender, TappedEventArgs e)
    {

        Image tappedImage = (Image)sender;
        string sourcePath = (tappedImage.Source as FileImageSource)?.File;

        SelectedSig = sigs.FirstOrDefault(x => x.ImageSource == sourcePath);
    }

    private async void btnPlus_Clicked(object sender, EventArgs e)
    {

        if (MediaPicker.Default.IsCaptureSupported)
        {

            //LOAD PHOTO
            FileResult myPhoto = await MediaPicker.Default.PickPhotoAsync();
            if (myPhoto != null)
            {
                //save the image captured in the application.
                string localFilePath = Path.Combine(FileSystem.CacheDirectory, myPhoto.FileName);
                using Stream sourceStream = await myPhoto.OpenReadAsync();

                imageSource = localFilePath;
                imgs.Add(new SigImage() { ID = "4", ImageSource = imageSource, Name = "Sig4" });

                using FileStream localFileStream = File.OpenWrite(localFilePath);
                await sourceStream.CopyToAsync(localFileStream);
                //await Shell.Current.DisplayAlert("Success", "Image uploaded successfully", "Ok");
            }
        }
        else
        {
            await Shell.Current.DisplayAlert("OOPS", "You device isn't supported", "Ok");
        }
        /*i.Open the device photo library to complete the process of adding.
        The user should be prompted for the name of the photo
        ii.Execute API: AddPrivPhoto to save the photo to AWS, with a
        return ID# for the photo*/
    }

    private async void btnMinus_Click(object sender, EventArgs e)
    {

        var res = await DisplayAlert("Confirmation", "Do you want to quit?", "Yes", "No");
    
        if(res)
        {
            imgs.Remove(new SigImage() { ID = "4", ImageSource = imageSource, Name = "Sig4" });
        }
        //An Alert window should pop up asking if they want to delete the
        //photo
        //iii.Execute API: DelPrivPhoto to delete the photo at AWS


    }

    private async void btnSigPlus_Click(object sender, EventArgs e)
    {
        if (MediaPicker.Default.IsCaptureSupported)
        {

            //LOAD PHOTO
            FileResult myPhoto = await MediaPicker.Default.PickPhotoAsync();
            if (myPhoto != null)
            {
                //save the image captured in the application.
                string localFilePath = Path.Combine(FileSystem.CacheDirectory, myPhoto.FileName);
                using Stream sourceStream = await myPhoto.OpenReadAsync();

                sigSource = localFilePath;
                sigs.Add(new SigImage() { ID = "4", ImageSource = sigSource, Name = "Sig4" });

                using FileStream localFileStream = File.OpenWrite(localFilePath);
                await sourceStream.CopyToAsync(localFileStream);
                //await Shell.Current.DisplayAlert("Success", "Image uploaded successfully", "Ok");
            }
        }
        else
        {
            await Shell.Current.DisplayAlert("OOPS", "You device isn't supported", "Ok");
        }
        /*i.Open the device photo library to complete the process of adding.
        The user should be prompted for the name of the photo
        ii. Execute API: AddPrivDig to save the photo to AWS, with a return
        ID# for the photo
         */
    }

    private async void btnSigMinus_Click(object sender, EventArgs e)
    {
        var res = await DisplayAlert("Confirmation", "Do you want to quit?", "Yes", "No");

        if (res)
        {
            sigs.Remove(new SigImage() { ID = "4", ImageSource = sigSource, Name = "Sig4" });
        }
        /*
         i. An Alert window should pop up asking if they want delete the photo
        ii. Execute API: DelPriSig to delete the photo at AWS
         */
    }
}