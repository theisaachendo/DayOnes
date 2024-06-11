using DayOnes.Views;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DayOnes.ViewModels
{
    class PostCardActionViewModel
    {
        public ObservableCollection<Post> Posts { get; set; }

        public PostCardActionViewModel()
        {

            new ObservableCollection<Post>
            {
                new Post() { SenderName = "Julie", SenderImage = "singer.png", Content = "You have Received a gift!", },
                new Post() { SenderName = "Steve", SenderImage = "singer.png", Content = "You have Received a gift!", },
                new Post() { SenderName = "Tom", SenderImage = "singer.png", Content = "You have Received a gift!", },
                new Post() { SenderName = "Martyn", SenderImage = "singer.png", Content = "You have Received a gift!", }

            };
        }
    }
    class Post
    {
        public string SenderName { get; set; }
        public string SenderImage { get; set; }
        public string Content { get; set; }
        public bool IsLiked { get; set; }

    }
}
