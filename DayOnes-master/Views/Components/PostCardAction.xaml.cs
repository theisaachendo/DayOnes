using Microsoft.Maui;
using System.Collections.ObjectModel;

namespace DayOnes.Views.Components;

public partial class PostCardAction : ContentView
{

    #region Bindable Properties

    //ArtistName Property 
    public static readonly BindableProperty ArtistNameProperty =
        BindableProperty.Create(
            nameof(ArtistName),
            typeof(string),
            typeof(PostCardAction),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (PostCardAction)bindable;
                control.lblArtistName.Text = newValue as string;
            });

    //ArtistImage Property 
    public static readonly BindableProperty ArtistImageProperty =
        BindableProperty.Create(
            nameof(ArtistImage),
            typeof(string),
            typeof(PostCardAction),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (PostCardAction)bindable;
                control.imgProfile.Source = newValue as string;
            });

    //PostContent Property 
    public static readonly BindableProperty PostContentProperty =
        BindableProperty.Create(
            nameof(PostContent),
            typeof(string),
            typeof(PostCardAction),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (PostCardAction)bindable;
                control.lblPostContent.Text = newValue as string;
            });

    //IsLiked Property 
    public static readonly BindableProperty IsLikedProperty =
        BindableProperty.Create(
            nameof(IsLiked), 
            typeof(Boolean), 
            typeof(PostCardAction),
            propertyChanged: (bindable, oldValue, newValue) =>
            {
                var control = (PostCardAction)bindable;
                control.IsLiked = Convert.ToBoolean(newValue);
            });

    #endregion

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
    public Boolean IsLiked
    {
        get => (Boolean)GetValue(IsLikedProperty);
        set => SetValue(IsLikedProperty, value);
    }

    #endregion

    public event EventHandler<EventArgs> BtnTapped;

    private void OnBtnTapped(object sender, EventArgs e)
    {
        BtnTapped?.Invoke(sender, e);
    }


    public PostCardAction()
	{
		InitializeComponent();

        //Conditionally setting the like image based on the message is liked or not
        if (IsLiked)
            this.imgLike.Source = "heartvector.png";
        else
            this.imgLike.Source = "heartvectorfilled.png";
        //this.lblArtistName.Text = ArtistName;
    }
}