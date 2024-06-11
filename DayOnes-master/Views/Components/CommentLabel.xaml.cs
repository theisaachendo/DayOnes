namespace DayOnes.Views.Components;

public partial class CommentLabel : ContentView
{

    public static readonly BindableProperty LabelTextProperty = BindableProperty.Create(
        nameof(Count), typeof(string), typeof(CommentLabel), string.Empty);

    public string Count
    {
        get => (string)GetValue(LabelTextProperty);
        set
        {
            SetValue(LabelTextProperty, value);
            lblCount.Text = $"Comments ({value})";
        }
    }
    public CommentLabel()
	{
		InitializeComponent();
	}
}