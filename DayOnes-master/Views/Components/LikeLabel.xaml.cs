namespace DayOnes.Views.Components;

public partial class LikeLabel : ContentView
{
    public static readonly BindableProperty LabelTextProperty = BindableProperty.Create(
        nameof(Count), typeof(string), typeof(LikeLabel), string.Empty);

    public string Count
    {
        get => (string)GetValue(LabelTextProperty);
        set
        {
            SetValue(LabelTextProperty, value);
            lblCount.Text = $"Likes ({value})";
        }
    }
    public LikeLabel()
	{
		InitializeComponent();
	}
}