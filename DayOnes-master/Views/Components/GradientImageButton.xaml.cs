namespace DayOnes.Views.Components;

public partial class GradientImageButton : ContentView
{
    public static readonly BindableProperty WidthProperty = BindableProperty.Create(nameof(Width), typeof(double), typeof(GradientImageButton), double.NaN);
    public static readonly BindableProperty HeightProperty = BindableProperty.Create(nameof(Height), typeof(double), typeof(GradientImageButton), double.NaN);
    public static readonly BindableProperty NameProperty = BindableProperty.Create(nameof(Name), typeof(string), typeof(GradientImageButton), string.Empty);

    //ImageSource Property 
    public static readonly BindableProperty ImageSourceProperty =
        BindableProperty.Create(
            nameof(ImageSource),
            typeof(string),
            typeof(GradientImageButton),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (GradientImageButton)bindable;
                control.btnGradient.Source = newValue as string;
            });



    public event EventHandler<EventArgs> OnClick;

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
    public string ImageSource
    {
        get => (string)GetValue(ImageSourceProperty);
        set => SetValue(ImageSourceProperty, value);//btnGradient.FontSize = Convert.ToInt32(value); //SetValue(FontSizeProperty, value);
    }


    public GradientImageButton()
    {
        InitializeComponent();
        btnGradient.BindingContext = this;
        btnGradient.SetBinding(Button.WidthRequestProperty, new Binding(nameof(Width), source: this));
        btnGradient.SetBinding(Button.HeightRequestProperty, new Binding(nameof(Height), source: this));
        
    }

    private void OnButtonClicked(object sender, EventArgs e)
    {
        OnClick?.Invoke(sender, e);
    }
}