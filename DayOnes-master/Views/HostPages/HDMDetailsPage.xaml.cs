using DayOnes.Models;
using DayOnes.Views.HostPages;
using System.Collections.ObjectModel;

namespace DayOnes.Views;

public partial class HDMDetailsPage : ContentPage
{
    public static string GroupName = "";
    public static string ClientID = "";

    private ObservableCollection<ChatMessage> messages;
	public HDMDetailsPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });

        ClientID = HDMDetailsList.ClientID;
        GroupName = HDMDetailsList.GroupName;

        messages = new ObservableCollection<ChatMessage>();

        messages.Add(new ChatMessage() { Message = "Rise, Fall, and Rationality", SentAt = DateTime.Now, IsSender = false });
        messages.Add(new ChatMessage() { Message = "Social Media", SentAt = DateTime.Now, IsSender = true });
        messages.Add(new ChatMessage() { Message = "This is the most important series", SentAt = DateTime.Now, IsSender = false });

        listMessages.ItemsSource = messages;
       /* Execute API: GetHOSTDMChat passing the
        Groupname & CliendchatID# from pervious pages*/
    }

    private void btnBack_Click(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync(nameof(HDMDetailsList));
    }

    private void sendButton_Tapped(object sender, TappedEventArgs e)
    {
        messages.Add(new ChatMessage() { Message = this.txtMessage.Text, SentAt = DateTime.Now, IsSender = true });
        listMessages.ItemsSource = messages;
    }
}