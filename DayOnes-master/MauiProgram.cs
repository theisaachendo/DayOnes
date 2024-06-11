using CommunityToolkit.Maui;
using DayOnes.Views;
using Microsoft.Extensions.Logging;
using Syncfusion.Maui.Core.Hosting;

namespace DayOnes
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>() // Only call this once.
                .UseMauiCommunityToolkit();

            builder.Services.AddTransient<FSettingsPage>();

            // Example of platform-specific modifications
            Microsoft.Maui.Handlers.EntryHandler.Mapper.AppendToMapping(nameof(Entry), (handler, view) =>
            {
#if __ANDROID__                 
                handler.PlatformView.SetBackgroundColor(Android.Graphics.Color.Transparent); 
#elif __IOS__                 
                handler.PlatformView.BackgroundColor = UIKit.UIColor.Clear;                 
                handler.PlatformView.BorderStyle = UIKit.UITextBorderStyle.None; 
#endif
            });

            builder.ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                fonts.AddFont("SF-Pro-Text-Regular.otf", "SFProText");
                fonts.AddFont("Brands-Regular-400.otf", "FAB");
                fonts.AddFont("Free-Regular-400.otf", "FAR");
                fonts.AddFont("Free-Solid-900.otf", "FAS");
            });

#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}
