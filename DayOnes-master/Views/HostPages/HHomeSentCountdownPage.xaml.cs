using System.ComponentModel;

namespace DayOnes.Views;

public partial class HHomeSentCountdownPage : ContentPage
{
    private const int CountdownDurationSeconds = 15;
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

    public HHomeSentCountdownPage()
	{
		InitializeComponent();
        Shell.SetBackButtonBehavior(this, new BackButtonBehavior
        {
            IsVisible = false
        });
        BindingContext = this;

        StartCountdown();

        this.lblCountDown.Text = RemainingSeconds.ToString();
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
            //btnInvites.IsEnabled = true;
            isCountdownRunning = false;
            await DisplayAlert("Invites Sent...", "Your Invites have been sent!", "OK");


            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(IsButtonEnabled)));

            Shell.Current.GoToAsync(nameof(HPOSTURSentMsgsPage));
        }
        catch { }
    }

}