using static System.Net.Mime.MediaTypeNames;

namespace DayOnes.Views.Components;
/*
public partial class TextBox : ContentView
{
    public static readonly BindableProperty LabelTextProperty = BindableProperty.Create(nameof(LabelText), typeof(string), typeof(TextBox), string.Empty);
    public static readonly BindableProperty PlaceHolderProperty = BindableProperty.Create(nameof(PlaceHolder), typeof(string), typeof(TextBox), string.Empty);

    public string LabelText
    {
        get => (string)GetValue(LabelTextProperty);
        set => SetValue(LabelTextProperty, value);
    }

    public string PlaceHolder
    {
        get => (string)GetValue(PlaceHolderProperty);
        set => SetValue(PlaceHolderProperty, value);
    }


    public TextBox()
    {
        InitializeComponent();
        textBox.Placeholder = PlaceHolder;
        lblName.Text = LabelText;
        //BindingContext = this; // Set the BindingContext to enable data binding
    }
}*/

public partial class TextBox : ContentView
{

    public static readonly BindableProperty LabelTextProperty = BindableProperty.Create(nameof(LabelText), typeof(string), typeof(TextBox), string.Empty);
    public static readonly BindableProperty WidthProperty = BindableProperty.Create(nameof(Width), typeof(double), typeof(TextBox), double.NaN);
    public static readonly BindableProperty HeightProperty = BindableProperty.Create(nameof(Height), typeof(double), typeof(TextBox), double.NaN);
    public static readonly BindableProperty NameProperty = BindableProperty.Create(nameof(Name), typeof(string), typeof(TextBox), string.Empty);
    public static readonly BindableProperty PlaceHolderProperty = BindableProperty.Create(nameof(PlaceHolder), typeof(string), typeof(TextBox), string.Empty);


    public event EventHandler<EventArgs> OnTextChange;
    public string LabelText
    {
        get => (string)GetValue(LabelTextProperty);
        set => SetValue(LabelTextProperty, value);
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
    public string PlaceHolder
    {
        get => (string)GetValue(PlaceHolderProperty);
        set => SetValue(PlaceHolderProperty, value);
    }


    public TextBox()
	{
		InitializeComponent(); 
        textBox.BindingContext = this;
        textBox.SetBinding(Entry.TextProperty, new Binding(nameof(Text), source: this));
        textBox.SetBinding(Grid.WidthRequestProperty, new Binding(nameof(Width), source: this));
        textBox.SetBinding(Grid.HeightRequestProperty, new Binding(nameof(Height), source: this));


    }
}