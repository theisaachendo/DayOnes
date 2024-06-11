using System.Xml;

namespace DayOnes.Views.Components;

public partial class FanTitleBar : ContentView
{
    public static readonly BindableProperty LabelTextProperty = BindableProperty.Create(
        nameof(Title), typeof(string), typeof(FanTitleBar), string.Empty);

    public string Title
    {
        get => (string)GetValue(LabelTextProperty);
        set
        {
            SetValue(LabelTextProperty, value);
            lblTitle.Text = value;
        }
    }
    public FanTitleBar()
	{
		InitializeComponent();

	}

}