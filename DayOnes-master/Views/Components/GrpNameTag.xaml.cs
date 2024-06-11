namespace DayOnes.Views.Components;

public partial class GrpNameTag : ContentView
{
    public static readonly BindableProperty LabelTextProperty = BindableProperty.Create(
        nameof(Title), typeof(string), typeof(GrpNameTag), string.Empty);

    public string Title
    {
        get => (string)GetValue(LabelTextProperty);
        set
        {
            SetValue(LabelTextProperty, value);
            lblName.Text = value;
        }
    }
    public GrpNameTag()
	{
		InitializeComponent();
	}
}