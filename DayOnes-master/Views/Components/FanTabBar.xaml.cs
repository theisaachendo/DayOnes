namespace DayOnes.Views.Components;

public partial class FanTabBar : ContentView
{
    public static int CurrentPage1 = 1;
    public static readonly BindableProperty CurrentPageProperty = BindableProperty.Create(
        nameof(CurrentPage), typeof(int), typeof(FanTitleBar), 0);

    public string CurrentPage
    {
        get => (string)GetValue(CurrentPageProperty);
        set
        {
            SetValue(CurrentPageProperty, value);
            //OnTapped(int.Parse(CurrentPage));
        }
    }

    public FanTabBar()
    {
        InitializeComponent();
        //Console.WriteLine(CurrentPage1);
        OnTapped(Temp.currenttabbarpage);
        //  OnTapped(int.Parse(CurrentPage));
        //switch (Convert.ToInt32(CurrentPage))
        //{
        //    case 1:
        //        lblHome.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        lblHomeTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        break;
        //    case 2:
        //        lblMsgs.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        lblMsgsTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        break;
        //    case 3:
        //        lblDM.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        lblDMTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        break;
        //    case 4:
        //        lblMyStuff.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        lblMyStuffTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        break;
        //    case 5:
        //        lblNotification.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        lblNotificationTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //        break;
        //    default:
        //        break;
        //}
    }

    private void lblHome_Tapped(object sender, TappedEventArgs e)
    {
        Temp.currenttabbarpage = 1;

        Shell.Current.GoToAsync(nameof(FHomePage));
        //lblHome.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //   OnTapped(CurrentPage1);

    }

    private void lblMsgs_Tapped(object sender, TappedEventArgs e)
    {
        Temp.currenttabbarpage = 2;

        Shell.Current.GoToAsync(nameof(FD1MsgsPage));
        //lblMsgs.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //   OnTapped(CurrentPage1);

    }

    private void lblDM_Tapped(object sender, TappedEventArgs e)
    {

        //lblDM.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        Temp.currenttabbarpage = 3;
        Shell.Current.GoToAsync(nameof(FDirectMsgsPage));

        //   OnTapped(CurrentPage1);

    }

    private void lblMyStuff_Tapped(object sender, TappedEventArgs e)
    {
        Temp.currenttabbarpage = 4;

        //lblMyStuff.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        Shell.Current.GoToAsync(nameof(FMyCollocationPage));
        // OnTapped(CurrentPage1);

    }

    private void lblNotification_Tapped(object sender, TappedEventArgs e)
    {
        Temp.currenttabbarpage = 5;

        //lblNotification.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        Shell.Current.GoToAsync(nameof(FNotificationsPage));
        //  OnTapped(CurrentPage1);
    }

    public void OnTapped(int tempCurrentPage)
    {

        if (tempCurrentPage == 1)
        {
            lblHome.Source = "shomeic";
            //lblHomeTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        }
        else
        {
            lblHome.Source = "homeic";

            //lblHome.TextColor = Color.FromHex("{StaticResource DefaultWhite}");
            //lblHomeTitle.TextColor = Color.FromHex("{StaticResource DefaultWhite}");
        }

        if (tempCurrentPage == 2)
        {
            lblMsgs.Source = "smsgsic";
            //lblMsgsTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        }
        else
        {
            lblMsgs.Source = "msgsic";

            //lblMsgs.TextColor = Color.FromHex("{StaticResource DefaultWhite}");
            //lblMsgsTitle.TextColor = Color.FromHex("{StaticResource DefaultWhite}");
        }

        if (tempCurrentPage == 3)
        {
            lblDM.Source = "sdmic";
            //lblDMTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        }
        else
        {
            lblDM.Source = "dmic";

        }

        if (tempCurrentPage == 4)
        {
            lblMyStuff.Source = "smystuffic";
            //lblMyStuffTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        }
        else
        {
            lblMyStuff.Source = "mystuffic";

        }

        if (tempCurrentPage == 5)
        {
            lblNotification.Source = "snotificationic";
        }
        else
        {
            lblNotification.Source = "notificationic";

        }

    }
}