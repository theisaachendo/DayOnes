using System;
using System.Text.Json;
using WebSocketSharp;

namespace DayOnes.UtilityClass
{
    public class WebSocketService
    {
        private WebSocket ws;
        private string username;
        private string connectionId;

        public WebSocketService(string username)
        {
            this.username = username;
            InitializeWebSocket();
        }

        private void InitializeWebSocket()
        {
            string apiUrl = $"wss://visg9cqg1e.execute-api.us-west-1.amazonaws.com/productionv3/?username={username}";
            ws = new WebSocket(apiUrl);

            ws.OnMessage += OnMessageReceived;
            ws.OnOpen += OnOpened;
            ws.OnError += OnError;
            ws.OnClose += OnClosed;

            ws.Connect();
        }

        public void Disconnect()
        {
            ws?.Close();
        }

        private void OnMessageReceived(object sender, MessageEventArgs e)
        {
            Console.WriteLine("Received: " + e.Data);
        }

        private void OnOpened(object sender, EventArgs e)
        {
            Console.WriteLine("Connected!");
        }

        private void OnError(object sender, WebSocketSharp.ErrorEventArgs e)
        {
            Console.WriteLine("Error: " + e.Message);
        }

        private void OnClosed(object sender, CloseEventArgs e)
        {
            Console.WriteLine($"Disconnected! Code: {e.Code}, Reason: {e.Reason}");
        }
    }
}
