using Microsoft.Maui.Controls;

namespace DayOnes.Views
{
    public partial class WhatToSendPage : ContentPage
    {
        public WhatToSendPage()
        {
            InitializeComponent();
            Shell.SetBackButtonBehavior(this, new BackButtonBehavior
            {
                IsVisible = false
            });
        }

        private void btnUseCamera_Click(object sender, EventArgs e)
        {
            // Logic for using the camera
        }

        private void btnUploadPhoto_Click(object sender, EventArgs e)
        {
            // Logic for uploading a photo
        }

        private void btnAttachMessage_Click(object sender, EventArgs e)
        {
            // Logic for attaching a message
        }
    }
}
