using DayOnes.Views.HostPages;

namespace DayOnes.Views.Components;

public partial class HostTabBar : ContentView
{
    public static int CurrentPage1 = 1;
    public static readonly BindableProperty CurrentPageProperty = BindableProperty.Create(
        nameof(CurrentPage), typeof(int), typeof(HostTabBar), 0);

    public string CurrentPage
    {
        get => (string)GetValue(CurrentPageProperty);
        set
        {
            SetValue(CurrentPageProperty, value);
            //OnTapped(int.Parse(CurrentPage));
        }
    }

    public HostTabBar()
    {
        InitializeComponent();
        OnTapped(Temp.currenttabbarpage);
    }
    private void lblHome_Tapped(object sender, TappedEventArgs e)
    {
        Temp.currenttabbarpage = 1;

        Shell.Current.GoToAsync(nameof(HHomePage));
        //lblHome.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //   OnTapped(CurrentPage1);

    }

    private void lblMsgs_Tapped(object sender, TappedEventArgs e)
    {
        Temp.currenttabbarpage = 2;     

        Shell.Current.GoToAsync(nameof(HPOSTURSentMsgsPage));
        //lblMsgs.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        //   OnTapped(CurrentPage1);

    }

    private void lblDM_Tapped(object sender, TappedEventArgs e)
    {

        //lblDM.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        Temp.currenttabbarpage = 3;
        Shell.Current.GoToAsync(nameof(HDMDetailsList));

        //   OnTapped(CurrentPage1);

    }
    private void lblNotification_Tapped(object sender, TappedEventArgs e)
    {
        Temp.currenttabbarpage = 4;

        //lblNotification.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        Shell.Current.GoToAsync(nameof(HNotificationsPage));
        //  OnTapped(CurrentPage1);
    }
    private void lblSetting_Tapped(object sender, TappedEventArgs e)
    {

        Temp.currenttabbarpage = 5;

        //lblMyStuff.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        Shell.Current.GoToAsync(nameof(HSettingsPage));
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
            lblMsgs.Source = "spostic";
            //lblMsgsTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        }
        else
        {
            lblMsgs.Source = "postic";

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
            lblNotification.Source = "snotificationic";
            //lblMyStuffTitle.TextColor = Color.FromHex("{StaticResource DefaultPink}");
        }
        else
        {
            lblNotification.Source = "notificationic";

        }

        if (tempCurrentPage == 5)
        {
            lblSetting.Source = "ssetting";
        }
        else
        {
            lblSetting.Source = "settings";

        }

    }


}