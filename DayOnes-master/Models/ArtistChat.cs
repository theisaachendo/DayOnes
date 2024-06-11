using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DayOnes.Models
{
    public class ArtistChat
    {
        public string ID { get; set; }
        public string ArtistName { get; set; }
        public string ArtistImage { get; set; }
        public string LikeCount { get; set; }
        public Boolean IsLiked { get; set; }
    }
}
