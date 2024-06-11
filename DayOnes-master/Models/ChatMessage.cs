using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DayOnes.Models
{
    public class ChatMessage
    {
        public string Message { get; set; }
        public DateTime SentAt { get; set; }
        public bool IsSender { get; set; }
    }
}
