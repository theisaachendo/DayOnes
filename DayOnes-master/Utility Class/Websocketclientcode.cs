using System;
using System.Text.Json;
using WebSocketSharp;

namespace WebSocketClientApp
{
    class WebSocketClient
    {
        private WebSocket? ws;
        private string? username;
        private string? connectionId;

        public WebSocketClient(string username)
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

        public void CreateSession(string groupName)
        {
            if (ws != null && ws.ReadyState == WebSocketState.Open)
            {
                var message = new
                {
                    action = "createSession",
                    username = username,
                    groupName = groupName
                };
                string jsonMessage = JsonSerializer.Serialize(message);
                Console.WriteLine("Sending JSON: " + jsonMessage);
                ws.Send(jsonMessage);
            }
            else
            {
                Console.WriteLine("WebSocket connection is not open.");
            }
        }

        public void JoinSession(string sessionId)
        {
            if (ws != null && ws.ReadyState == WebSocketState.Open)
            {
                var message = new
                {
                    action = "joinSession",
                    username = username,
                    sessionId = sessionId
                };
                string jsonMessage = JsonSerializer.Serialize(message);
                Console.WriteLine("Sending JSON: " + jsonMessage);
                ws.Send(jsonMessage);
            }
            else
            {
                Console.WriteLine("WebSocket connection is not open.");
            }
        }

        public void SendMessage(string sessionId, string messageText, bool isPrivate, string recipient = "")
        {
            if (ws != null && ws.ReadyState == WebSocketState.Open)
            {
                var message = new
                {
                    action = "sendMessage",
                    username = username,
                    sessionId = sessionId,
                    message = messageText,
                    isPrivate = isPrivate,
                    recipient = isPrivate ? recipient : null
                };
                string jsonMessage = JsonSerializer.Serialize(message);
                Console.WriteLine("Sending JSON: " + jsonMessage);
                ws.Send(jsonMessage);
            }
            else
            {
                Console.WriteLine("WebSocket connection is not open.");
            }
        }

        public void ListSessions()
        {
            if (ws != null && ws.ReadyState == WebSocketState.Open)
            {
                var message = new
                {
                    action = "listSessions",
                    username = username
                };
                string jsonMessage = JsonSerializer.Serialize(message);
                Console.WriteLine("Sending JSON: " + jsonMessage);
                ws.Send(jsonMessage);
            }
            else
            {
                Console.WriteLine("WebSocket connection is not open.");
            }
        }

        private void OnMessageReceived(object? sender, MessageEventArgs e)
        {
            if (e.Data == null)
            {
                Console.WriteLine("Received data is null.");
                return;
            }

            Console.WriteLine("Received: " + e.Data);

            try
            {
                using (JsonDocument doc = JsonDocument.Parse(e.Data))
                {
                    JsonElement root = doc.RootElement;

                    if (root.TryGetProperty("connectionId", out JsonElement connId))
                    {
                        connectionId = connId.GetString();
                        Console.WriteLine("Connection ID: " + connectionId);
                    }

                    if (root.TryGetProperty("sessions", out JsonElement sessions))
                    {
                        if (sessions.ValueKind == JsonValueKind.Array)
                        {
                            Console.WriteLine("You are part of the following sessions:");
                            foreach (var session in sessions.EnumerateArray())
                            {
                                Console.WriteLine($"- Session ID: {session.GetString()}");
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine("Received message: " + e.Data);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error processing message: " + ex.Message);
            }
        }

        private void OnOpened(object? sender, EventArgs e)
        {
            Console.WriteLine("Connected!");
        }

        private void OnError(object? sender, WebSocketSharp.ErrorEventArgs e)
        {
            Console.WriteLine("Error: " + e?.Message);
        }

        private void OnClosed(object? sender, CloseEventArgs e)
        {
            Console.WriteLine($"Disconnected! Code: {e.Code}, Reason: {e.Reason}");
        }
    }
}
