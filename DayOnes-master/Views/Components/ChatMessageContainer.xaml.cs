namespace DayOnes.Views.Components;

public partial class ChatMessageContainer : ContentView
{

    //ArtistName Property 
    public static readonly BindableProperty MessageProperty =
        BindableProperty.Create(
            nameof(Message),
            typeof(string),
            typeof(ChatMessageContainer),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (ChatMessageContainer)bindable;
                control.lblMessage.Text = newValue as string;
            });


    //ArtistName Property 
    public static readonly BindableProperty SentAtProperty =
        BindableProperty.Create(
            nameof(SentAt),
            typeof(DateTime),
            typeof(ChatMessageContainer),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (ChatMessageContainer)bindable;
                control.lblSentAt.Text = (Convert.ToDateTime(newValue)).ToString("hh:mm tt");
            });


    //ArtistName Property 
    public static readonly BindableProperty IsSenderProperty =
        BindableProperty.Create(
            nameof(IsSender),
            typeof(Boolean),
            typeof(ChatMessageContainer),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (ChatMessageContainer)bindable;
                if (Convert.ToBoolean(newValue))
                {
                    control.frmMain.BackgroundColor = Color.FromArgb("#8337FF");
                    control.lblMessage.TextColor = Color.FromArgb("#FFFFFF");
                    control.lblSentAt.TextColor = Color.FromArgb("#FFFFFF");
                }

                else
                {
                    control.frmMain.BackgroundColor = Color.FromArgb("#FFFFFF");
                    control.lblMessage.TextColor = Color.FromArgb("#22282B");
                    control.lblSentAt.TextColor = Color.FromArgb("#22282B");

                }
                /* if (Convert.ToBoolean(newValue))
                 {
                     control.frmMain.BackgroundColor = Color.FromArgb("{StaticResource DefaultDimPurple}");
                     control.lblSentAt.TextColor = Color.FromArgb("{StaticResource DefaultDarkGrey}");
                 }

                 else
                 {
                     control.frmMain.BackgroundColor = Color.FromArgb("{StaticResource DefaultDarkGrey}");
                     control.lblMessage.TextColor = Color.FromArgb("{StaticResource DefaultBlack}");

                 }*/
            });


    public string Message
    {
        get => (string)GetValue(MessageProperty);
        set => SetValue(MessageProperty, value);
    }
    public DateTime SentAt
    {
        get => (DateTime)GetValue(SentAtProperty);
        set => SetValue(SentAtProperty, value);
    }
    public Boolean IsSender
    {
        get => (Boolean)GetValue(IsSenderProperty);
        set => SetValue(IsSenderProperty, value);
    }

    public ChatMessageContainer()
	{
		InitializeComponent();
	}
}