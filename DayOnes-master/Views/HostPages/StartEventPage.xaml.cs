using Microsoft.Maui.Controls;

namespace DayOnes.Views
{
    public partial class StartEventPage : ContentPage
    {
        public StartEventPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
        }

        private async void btnStart_Click(object sender, EventArgs e)
        {
            await Shell.Current.GoToAsync(nameof(WhatToSendPage));
        }
    }
}
