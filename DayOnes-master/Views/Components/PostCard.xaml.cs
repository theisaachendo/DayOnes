namespace DayOnes.Views.Components;

public partial class PostCard : ContentView
{


    #region Bindable Properties

    //ArtistName Property 
    public static readonly BindableProperty ArtistNameProperty =
        BindableProperty.Create(
            nameof(ArtistName),
            typeof(string),
            typeof(PostCard),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (PostCard)bindable;
                control.lblArtistName.Text = newValue as string;
            });

    //ArtistImage Property 
    public static readonly BindableProperty ArtistImageProperty =
        BindableProperty.Create(
            nameof(ArtistImage),
            typeof(string),
            typeof(PostCard),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (PostCard)bindable;
                control.imgProfile.Source = newValue as string;
            });

    //PostContent Property 
    public static readonly BindableProperty PostContentProperty =
        BindableProperty.Create(
            nameof(PostContent),
            typeof(string),
            typeof(PostCard),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (PostCard)bindable;
                control.lblPostContent.Text = newValue as string;
            });

    //IsPinned Property 
    public static readonly BindableProperty IsPinnedProperty =
        BindableProperty.Create(
            nameof(IsPinned),
            typeof(Boolean),
            typeof(PostCard),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (PostCard)bindable;
                control.IsPinned = Convert.ToBoolean(newValue);
            });

    #endregion


    public event EventHandler<EventArgs> PinTapped;
    public event EventHandler<EventArgs> FanTapped;

    #region Properties


    public string ArtistName
    {
        get => (string)GetValue(ArtistNameProperty);
        set => SetValue(ArtistNameProperty, value);
    }
    public string ArtistImage
    {
        get => (string)GetValue(ArtistImageProperty);
        set => SetValue(ArtistImageProperty, value);
    }
    public string PostContent
    {
        get => (string)GetValue(PostContentProperty);
        set => SetValue(PostContentProperty, value);
    }
    public Boolean IsPinned
    {
        get => (Boolean)GetValue(IsPinnedProperty);
        set => SetValue(IsPinnedProperty, value); 
    }

    #endregion


    private void OnPinTapped(object sender, EventArgs e)
    {
        PinTapped?.Invoke(sender, e);
    }


    private void OnFanTapped(object sender, EventArgs e)
    {
        FanTapped?.Invoke(sender, e);
    }

    public PostCard()
	{
		InitializeComponent();
        if (IsPinned)
            this.imgPin.Source = "pin.png";
        else
            this.imgPin.Source = "pin.png";
    }

}