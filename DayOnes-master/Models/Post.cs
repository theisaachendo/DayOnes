using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DayOnes.Models
{
    public class Post
    {
        public string ArtistName { get; set; }
        public string ArtistImage { get; set; }
        public string PostContent { get; set; }
        public bool IsLiked { get; set; }
        public bool IsPinned { get; set; }
    }
}
