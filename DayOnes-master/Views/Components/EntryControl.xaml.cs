using System.Xml;

namespace DayOnes.Views.Components;

public partial class EntryControl : ContentView
{
    public static readonly BindableProperty PlaceholderTextProperty = BindableProperty.Create(
        nameof(PlaceholderText), typeof(string), typeof(EntryControl), string.Empty);

    public static readonly BindableProperty LabelTextProperty = BindableProperty.Create(
        nameof(LabelText), typeof(string), typeof(EntryControl), string.Empty);

    public static readonly BindableProperty EntryFontSizeProperty = BindableProperty.Create(
        nameof(EntryFontSize), typeof(double), typeof(EntryControl), 16.0);

    public string PlaceholderText
    {
        get => (string)GetValue(PlaceholderTextProperty);
        set => SetValue(PlaceholderTextProperty, value);
    }

    public string LabelText
    {
        get => (string)GetValue(LabelTextProperty);
        set
        {
            SetValue(LabelTextProperty, value);
            lblText.Text = value;
        }
    }

    public double EntryFontSize
    {
        get => (double)GetValue(EntryFontSizeProperty);
        set => SetValue(EntryFontSizeProperty, value);
    }

    public EntryControl()
    {
        InitializeComponent();
        lblText.Text = LabelText;
        txtInput.FontSize = EntryFontSize;
    }
}