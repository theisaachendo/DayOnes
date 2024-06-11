using System.Windows.Input;

namespace DayOnes.Views.Components;

public partial class GradientButton : ContentView
{

    public static readonly BindableProperty TextProperty = BindableProperty.Create(nameof(Text), typeof(string), typeof(GradientButton), string.Empty);
    public static readonly BindableProperty WidthProperty = BindableProperty.Create(nameof(Width), typeof(double), typeof(GradientButton), double.NaN);
    public static readonly BindableProperty HeightProperty = BindableProperty.Create(nameof(Height), typeof(double), typeof(GradientButton), double.NaN);
    public static readonly BindableProperty NameProperty = BindableProperty.Create(nameof(Name), typeof(string), typeof(GradientButton), string.Empty);

    //FontSize Property 
    public static readonly BindableProperty FontSizeProperty =
        BindableProperty.Create(
            nameof(FontSize),
            typeof(string),
            typeof(GradientButton),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (GradientButton)bindable;
                control.btnGradient.FontSize = Convert.ToDouble(newValue);
            });


    public event EventHandler<EventArgs> OnClick;
    public string Text
    {
        get => (string)GetValue(TextProperty);
        set => SetValue(TextProperty, value);
    }

    public double Width
    {
        get => (double)GetValue(WidthProperty);
        set => SetValue(WidthProperty, value);
    }

    public double Height
    {
        get => (double)GetValue(HeightProperty);
        set => SetValue(HeightProperty, value);
    }

    public string Name
    {
        get => (string)GetValue(NameProperty);
        set => SetValue(NameProperty, value);
    }
    public string FontSize
    {
        get => (string)GetValue(FontSizeProperty);
        set => SetValue(FontSizeProperty, value);
    }



    public GradientButton()
    {
        InitializeComponent();
        btnGradient.BindingContext = this;
        btnGradient.SetBinding(Button.TextProperty, new Binding(nameof(Text), source: this));
        btnGradient.SetBinding(Button.WidthRequestProperty, new Binding(nameof(Width), source: this));
        btnGradient.SetBinding(Button.HeightRequestProperty, new Binding(nameof(Height), source: this));
        btnGradient.SetBinding(Button.FontSizeProperty, new Binding(nameof(FontSize), source: this));
        btnGradient.FontSize = Convert.ToInt32(this.FontSize);
    }

    private void OnButtonClicked(object sender, EventArgs e)
    {
        OnClick?.Invoke(sender, e);
    }
    //public GradientButton()
    //{
    //	InitializeComponent();
    //}
}