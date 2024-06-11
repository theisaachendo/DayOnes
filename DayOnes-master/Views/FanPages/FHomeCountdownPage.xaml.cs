using System.Collections.Generic;
using System.ComponentModel;


namespace DayOnes.Views;

public partial class FHomeCountdownPage : ContentPage
{
    private const int CountdownDurationSeconds = 30;
    private int remainingSeconds;
    private bool isCountdownRunning;

    public event PropertyChangedEventHandler PropertyChanged;

    public int RemainingSeconds
    {
        get => remainingSeconds;
        set
        {
            if (remainingSeconds != value)
            {
                remainingSeconds = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(RemainingSeconds)));
            }
        }
    }

    public bool IsButtonEnabled => !isCountdownRunning && remainingSeconds == 0;

    public FHomeCountdownPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
        BindingContext = this;

        StartCountdown();



        this.lblCountDown.Text = RemainingSeconds.ToString();//This is just a testing data.
    }

    private async void StartCountdown()
    {
        try
        {
            RemainingSeconds = CountdownDurationSeconds;
            isCountdownRunning = true;

            while (RemainingSeconds > 0)
            {
                await Task.Delay(1000); // Delay for one second
                RemainingSeconds--;
                this.lblCountDown.Text = RemainingSeconds.ToString();
            }
            btnInvites.IsEnabled = true;
            isCountdownRunning = false;
            btnInvites.IsVisible = true;
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsButtonEnabled)));
        }
        catch { }
    }

    private void btnInvites_Click(object sender, EventArgs e)
    {
        /*
         If the countdown completes to zero, the user will press the
Receive Invites again, and the countdown begins again.
2. During the countdown, the app should be ready to receive a
message indicating a gif has arrived.
a. When that message arrives at the app, the app should
navigate to Page - F-Message receive
         */
        Shell.Current.GoToAsync(nameof(FMessageReceivedPage));
    }
}