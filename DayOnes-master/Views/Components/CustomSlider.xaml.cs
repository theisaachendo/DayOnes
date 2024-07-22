using System;
using Microsoft.Maui.Controls;

namespace DayOnes.Views.Components
{
    public partial class CustomSlider : ContentView
    {
        private const double FT_TO_METER = 0.3048;
        public static readonly BindableProperty DistanceProperty =
            BindableProperty.Create(nameof(Distance), typeof(double), typeof(CustomSlider), 10.0, BindingMode.TwoWay, propertyChanged: OnDistanceChanged);

        public double Distance
        {
            get => (double)GetValue(DistanceProperty);
            set => SetValue(DistanceProperty, value);
        }

        public CustomSlider()
        {
            InitializeComponent();
            UpdateLabels();
        }

        private void Slider_ValueChanged(object sender, ValueChangedEventArgs e)
        {
            Distance = e.NewValue;
        }

        private void Slider_DragCompleted(object sender, EventArgs e)
        {
            // Round to the nearest 10
            Distance = Math.Round(Distance / 10) * 10;
            // Update the slider value to the rounded value
            distanceSlider.Value = Distance;
            UpdateLabels();
        }

        private static void OnDistanceChanged(BindableObject bindable, object oldValue, object newValue)
        {
            var control = (CustomSlider)bindable;
            control.UpdateLabels();
        }

        private void UpdateLabels()
        {
            lblFtDistance.Text = $"{Math.Round(Distance, 2)} ft";
            lblMeterDistance.Text = $"{Math.Ceiling(Distance * FT_TO_METER).ToString("0.00")} m";
        }
    }
}
