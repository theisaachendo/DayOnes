namespace DayOnes.Views.Components;

public partial class HostPostContainer : ContentView
{

    //PostContent Property 
    public static readonly BindableProperty GroupNameProperty =
        BindableProperty.Create(
            nameof(GroupName),
            typeof(string),
            typeof(HostPostContainer),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (HostPostContainer)bindable;
                control.lblGroupName.Title = newValue as string;
            });


    //PostContent Property 
    public static readonly BindableProperty ImageSourceProperty =
        BindableProperty.Create(
            nameof(ImageSource),
            typeof(string),
            typeof(HostPostContainer),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (HostPostContainer)bindable;
                control.imgMain.Source = newValue as string;
            });


    //PostContent Property 
    public static readonly BindableProperty PostContentProperty =
        BindableProperty.Create(
            nameof(PostContent),
            typeof(string),
            typeof(HostPostContainer),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (HostPostContainer)bindable;
                control.lblPost.Text = newValue as string;
            });


    //PostContent Property 
    public static readonly BindableProperty LikeCountProperty =
        BindableProperty.Create(
            nameof(LikeCount),
            typeof(string),
            typeof(HostPostContainer),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (HostPostContainer)bindable;
                control.lblLike.Count = newValue as string;
            });


    //PostContent Property 
    public static readonly BindableProperty CommentCountProperty =
        BindableProperty.Create(
            nameof(CommentCount),
            typeof(string),
            typeof(HostPostContainer),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (HostPostContainer)bindable;
                control.lblComment.Count = newValue as string;
            });

    public string GroupName
    {
        get => (string)GetValue(GroupNameProperty);
        set => SetValue(GroupNameProperty, value);
    }

    public string ImageSource
    {
        get => (string)GetValue(ImageSourceProperty);
        set => SetValue(ImageSourceProperty, value);
    }

    public string PostContent
    {
        get => (string)GetValue(PostContentProperty);
        set => SetValue(PostContentProperty, value);
    }

    public string LikeCount
    {
        get => (string)GetValue(LikeCountProperty);
        set => SetValue(LikeCountProperty, value);
    }

    public string CommentCount
    {
        get => (string)GetValue(CommentCountProperty);
        set => SetValue(CommentCountProperty, value);
    }

    public event EventHandler<EventArgs> BtnTapped;

    private void OnBtnTapped(object sender, EventArgs e)
    {
        BtnTapped?.Invoke(sender, e);
    }

    public HostPostContainer()
	{
		InitializeComponent();
	}

    private void lblPost_Tap(object sender, TappedEventArgs e)
    {

    }

    private void btnMsg_Click(object sender, EventArgs e)
    {

    }
}