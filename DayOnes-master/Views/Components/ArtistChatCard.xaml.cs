namespace DayOnes.Views.Components;

public partial class ArtistChatCard : ContentView
{

    #region Bindable Properties

    //ArtistName Property 
    public static readonly BindableProperty ArtistNameProperty =
        BindableProperty.Create(
            nameof(ArtistName),
            typeof(string),
            typeof(ArtistChatCard),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (ArtistChatCard)bindable;
                control.lblArtistName.Text = newValue as string;
            });

    //ArtistImage Property 
    public static readonly BindableProperty ArtistImageProperty =
        BindableProperty.Create(
            nameof(ArtistImage),
            typeof(string),
            typeof(ArtistChatCard),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (ArtistChatCard)bindable;
                control.imgArtist.Source = newValue as string;
            });

    //LikeCount Property 
    public static readonly BindableProperty LikeCountProperty =
        BindableProperty.Create(
            nameof(LikeCount),
            typeof(string),
            typeof(ArtistChatCard),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (ArtistChatCard)bindable;
                control.lblLikeCount.Text = newValue as string;
            });

    //IsLiked Property 
    public static readonly BindableProperty IsLikedProperty =
        BindableProperty.Create(
            nameof(IsLiked),
            typeof(Boolean),
            typeof(ArtistChatCard),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (ArtistChatCard)bindable;
                control.IsLiked = Convert.ToBoolean(newValue);
            });

    #endregion


    public event EventHandler<EventArgs> ChatTapped;

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
    public string LikeCount
    {
        get => (string)GetValue(LikeCountProperty);
        set => SetValue(LikeCountProperty, value);
    }
    public Boolean IsLiked
    {
        get => (Boolean)GetValue(IsLikedProperty);
        set => SetValue(IsLikedProperty, value);
    }

    #endregion

    public ArtistChatCard()
	{
		InitializeComponent();
    }

    private void OnChatTapped(object sender, EventArgs e)
    {
        ChatTapped?.Invoke(sender, e);
    }
}