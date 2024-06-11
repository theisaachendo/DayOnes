

using DayOnes.Views.HostPages;
using Microsoft.Maui.Graphics;
using SkiaSharp;

namespace DayOnes.Views;

public partial class HFinalSeeSelfiePage : ContentPage
{
    private SKBitmap imgCapturedBitmap;
    private SKBitmap imgSigBitmap;

    public HFinalSeeSelfiePage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        //
        this.imgCaptured.Source = HHomePage.CapturedImageResource;

        imgSig.Source = HSelfieChooseSigPage.SelectedSigID.ImageSource;
        string sigID = HSelfieChooseSigPage.SelectedSigID.ID;
        //Invoke API: Get AllSigs100

    }

    private void imgCancel_Tap(object sender, TappedEventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HSelfieChooseSigPage));
    }

    private async void imgUpload_Tap(object sender, TappedEventArgs e)
    {
        /*a.Remove the dotted lines around the signature.
        b.Save the photo in temporary storage, with new
        Name & ID.
        c.Evoke API to upload this photo API:
        UPLPhotoSig.
        */

        // Generate a temporary file path
        /*  string tempFilePath = Path.Combine(FileSystem.CacheDirectory, img);

          // Open a FileStream for writing
          using FileStream localFileStream = File.OpenWrite(tempFilePath);

          // Copy the image stream asynchronously
          await sourceStream.CopyToAsync(localFileStream);*/


        // Open a FileStream for writing
       /* using FileStream localFileStream = File.OpenWrite(this.imgCaptured.Source.ToString());
        using Stream sourceStream = await myPhoto.OpenReadAsync();

        // Copy the image stream asynchronously
        await sourceStream.CopyToAsync(localFileStream);*/
        await CombineAndSaveImagesAsync();
        Shell.Current.GoToAsync(nameof(HHomeUploadedPage));

    }
    private async Task LoadImagesAsync()
    {
        // Load image sources into SKBitmap objects
        imgCapturedBitmap = LoadImageBitmap(imgCaptured.Source.ToString());
        imgSigBitmap = LoadImageBitmap(imgSig.Source.ToString());
    }

    private SKBitmap LoadImageBitmap(string imagePath)
    {
        using (SKBitmap bitmap = SKBitmap.Decode(imagePath))
        {
            return bitmap.Copy();
        }
    }

    private async Task CombineAndSaveImagesAsync()
    {
        if (imgCapturedBitmap == null || imgSigBitmap == null)
        {
            await DisplayAlert("Error", "Images not loaded", "OK");
            return;
        }

        // Create a new SKBitmap for the combined image
        SKBitmap combinedBitmap = new SKBitmap(imgCapturedBitmap.Width, imgCapturedBitmap.Height);

        // Create an SKCanvas for drawing onto the combined bitmap
        using (SKCanvas canvas = new SKCanvas(combinedBitmap))
        {
            // Draw the captured image onto the canvas
            canvas.DrawBitmap(imgCapturedBitmap, 0, 0);

            // Calculate the position for the signature image (e.g., bottom-right corner with padding)
            int xPos = combinedBitmap.Width - imgSigBitmap.Width - 20; // 20 pixels padding from right
            int yPos = combinedBitmap.Height - imgSigBitmap.Height - 20; // 20 pixels padding from bottom

            // Draw the signature image onto the canvas at the calculated position
            canvas.DrawBitmap(imgSigBitmap, xPos, yPos);
        }

        // Convert the combined bitmap to a memory stream
        MemoryStream stream = new MemoryStream();
        combinedBitmap.Encode(SKEncodedImageFormat.Png, 100).SaveTo(stream);

        // Reset the memory stream position to the beginning
        stream.Position = 0;

        // Save the combined image temporarily
        string tempFilePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "combined_image.png");
        using (FileStream fileStream = File.OpenWrite(tempFilePath))
        {
            await stream.CopyToAsync(fileStream);
        }

        // Show success message
        await DisplayAlert("Success", "Combined image saved temporarily", "OK");
    }
}