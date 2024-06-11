using DayOnes.Views;
using DayOnes.Views.HostPages;

namespace DayOnes
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();

            //Fan Page Navigation routes registration
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(RegFanPage), typeof(RegFanPage));
            Routing.RegisterRoute(nameof(FHomePage), typeof(FHomePage));
            Routing.RegisterRoute(nameof(FHomeCountdownPage), typeof(FHomeCountdownPage));
            Routing.RegisterRoute(nameof(FMessageReceivedPage), typeof(FMessageReceivedPage));
            Routing.RegisterRoute(nameof(FD1MsgsBubblesPage), typeof(FD1MsgsBubblesPage));
            Routing.RegisterRoute(nameof(FD1MsgsPage), typeof(FD1MsgsPage));
            Routing.RegisterRoute(nameof(FDirectMsgsBubblesPage), typeof(FDirectMsgsBubblesPage));
            Routing.RegisterRoute(nameof(FDirectMsgsPage), typeof(FDirectMsgsPage));
            Routing.RegisterRoute(nameof(FMyCollocationPage), typeof(FMyCollocationPage));
            Routing.RegisterRoute(nameof(FMyPicsLrgPage), typeof(FMyPicsLrgPage));
            Routing.RegisterRoute(nameof(FNotificationsPage), typeof(FNotificationsPage));
            Routing.RegisterRoute(nameof(FProfilePage), typeof(FProfilePage));
            Routing.RegisterRoute(nameof(FQuickStartPage), typeof(FQuickStartPage));
            Routing.RegisterRoute(nameof(FSettingsPage), typeof(FSettingsPage));

            //

            Routing.RegisterRoute(nameof(HHomePage), typeof(HHomePage));
            Routing.RegisterRoute(nameof(HHomeUploadedPage), typeof(HHomeUploadedPage));
            Routing.RegisterRoute(nameof(HDMDetailsPage), typeof(HDMDetailsPage));
            Routing.RegisterRoute(nameof(HFinalSeeSelfiePage), typeof(HFinalSeeSelfiePage));
            Routing.RegisterRoute(nameof(HHomeSentCountdownPage), typeof(HHomeSentCountdownPage));
            Routing.RegisterRoute(nameof(HNewALLPostPage), typeof(HNewALLPostPage));
            Routing.RegisterRoute(nameof(HNewGrpPostPage), typeof(HNewGrpPostPage));
            Routing.RegisterRoute(nameof(HNotificationsPage), typeof(HNotificationsPage));
            Routing.RegisterRoute(nameof(HPageHSigPenColorEditPage), typeof(HPageHSigPenColorEditPage));
            Routing.RegisterRoute(nameof(HPostDetailsPage), typeof(HPostDetailsPage));
            Routing.RegisterRoute(nameof(HDMDetailsList), typeof(HDMDetailsList));
            Routing.RegisterRoute(nameof(HPOSTURSentMsgsPage), typeof(HPOSTURSentMsgsPage));
            Routing.RegisterRoute(nameof(HProfilePage), typeof(HProfilePage));
            Routing.RegisterRoute(nameof(HQuickStartPage), typeof(HQuickStartPage));
            Routing.RegisterRoute(nameof(HReviewPhotoPage), typeof(HReviewPhotoPage));
            Routing.RegisterRoute(nameof(HSeeSelfiePage), typeof(HSeeSelfiePage));
            Routing.RegisterRoute(nameof(HSelfieChooseSigPage), typeof(HSelfieChooseSigPage));
            Routing.RegisterRoute(nameof(HSettingsPage), typeof(HSettingsPage));
            Routing.RegisterRoute(nameof(HUPLPhotoChooseSigPage), typeof(HUPLPhotoChooseSigPage));
            Routing.RegisterRoute(nameof(HUPLSeePhotoPage), typeof(HUPLSeePhotoPage));
            Routing.RegisterRoute(nameof(HAssetsNManagementPage), typeof(HAssetsNManagementPage));
        }
    }
}
