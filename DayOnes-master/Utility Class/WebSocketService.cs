using System;
using WebSocketSharp;

namespace DayOnes.UtilityClass
{
    public class WebSocketService
    {
        private WebSocket ws;
        private string username;
        private const string APP_TAG = "DayOnesApp";

        public WebSocketService(string username)
        {
            this.username = username;
            InitializeWebSocket();
        }

        private void InitializeWebSocket()
        {
            string apiUrl = $"wss://l0xh1x2qg0.execute-api.us-west-1.amazonaws.com/ProductionV4/?username={username}";
            Console.WriteLine($"{APP_TAG}: Connecting to WebSocket at {apiUrl}");

            ws = new WebSocket(apiUrl);

            ws.OnMessage += OnMessageReceived;
            ws.OnOpen += OnOpened;
            ws.OnError += OnError;
            ws.OnClose += OnClosed;

            try
            {
                ws.Connect();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Exception while connecting to WebSocket: {ex.Message}");
            }
        }

        public void Disconnect()
        {
            ws?.Close();
            Console.WriteLine($"{APP_TAG}: WebSocket disconnected for user {username}.");
        }

        private void OnMessageReceived(object sender, MessageEventArgs e)
        {
            Console.WriteLine($"{APP_TAG}: Received message for user {username}: {e.Data}");
        }

        private void OnOpened(object sender, EventArgs e)
        {
            Console.WriteLine($"{APP_TAG}: WebSocket connected for user {username}.");
        }

        private void OnError(object sender, WebSocketSharp.ErrorEventArgs e)
        {
            Console.WriteLine($"{APP_TAG}: WebSocket error for user {username}: {e.Message}");
        }

        private void OnClosed(object sender, CloseEventArgs e)
        {
            Console.WriteLine($"{APP_TAG}: WebSocket disconnected for user {username}. Code: {e.Code}, Reason: {e.Reason}");
        }
    }
}
