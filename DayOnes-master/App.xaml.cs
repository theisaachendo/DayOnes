using Microsoft.Maui;
using Microsoft.Maui.Controls;
using DayOnes.Views;
using System;
using System.Threading.Tasks;

namespace DayOnes
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            // Show the splash screen first
            var splashScreen = new SplashScreenPage();
            MainPage = splashScreen;

            // Delay before navigating to AppShell
            Task.Run(async () =>
            {
                try
                {
                    // Simulate loading or animation duration
                    await Task.Delay(3000); // Replace with appropriate delay

                    // After splash screen duration, navigate to your AppShell (MainPage)
                    await MainThread.InvokeOnMainThreadAsync(() =>
                    {
                        MainPage = new AppShell();
                    });
                }
                catch (Exception ex)
                {
                    // Handle exceptions as necessary
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            });
        }
    }
}
