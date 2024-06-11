using System;
using System.Text.Json;
using WebSocketSharp;

namespace WebSocketClientApp
{
    class Program
    {
        static WebSocket? ws;
        static string? username;
        static string? connectionId;

        static void Main(string[] args)
        {
            Console.WriteLine("Please enter your username:");
            username = Console.ReadLine() ?? "defaultUser";

            string apiUrl = $"wss://visg9cqg1e.execute-api.us-west-1.amazonaws.com/productionv3/?username={username}";
            ws = new WebSocket(apiUrl);

            ws.OnMessage += OnMessageReceived;
            ws.OnOpen += OnOpened;
            ws.OnError += OnError;
            ws.OnClose += OnClosed;

            ws.Connect();
            HandleUserInput();
            ws.Close();
        }

        private static void HandleUserInput()
        {
            while (true)
            {
                Console.WriteLine("Enter command ('c' to create, 'j' to join, 's' to send, 'l' to list sessions, 'q' to quit):");
                char key = GetKey();
                switch (key)
                {
                    case 'c':
                        CreateSession();
                        break;
                    case 'j':
                        JoinSession();
                        break;
                    case 's':
                        SendMessage();
                        break;
                    case 'l':
                        ListSessions();
                        break;
                    case 'q':
                        return;
                    default:
                        Console.WriteLine("Invalid input. Use 'c', 'j', 's', 'l', or 'q'.");
                        break;
                }
            }
        }

        private static void CreateSession()
        {
            Console.WriteLine("Enter group name:");
            string groupName = Console.ReadLine() ?? "defaultGroup";
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

        private static void JoinSession()
        {
            Console.WriteLine("Enter session ID:");
            string sessionId = Console.ReadLine() ?? "defaultSessionId";
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

        private static void SendMessage()
        {
            Console.WriteLine("Enter session ID:");
            string sessionId = Console.ReadLine() ?? "defaultSessionId";
            Console.WriteLine("Enter your message:");
            string messageText = Console.ReadLine() ?? "";
            Console.WriteLine("Is this message private? (yes/no):");
            bool isPrivate = Console.ReadLine()?.ToLower() == "yes";
            string recipient = "";

            if (isPrivate)
            {
                Console.WriteLine("Enter the recipient's username:");
                recipient = Console.ReadLine() ?? "defaultRecipient";
            }

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

private static void ListSessions()
{
    if (ws != null && ws.ReadyState == WebSocketState.Open)
    {
        var message = new
        {
            // Assuming 'action' might still be needed to be parsed by your Lambda
            action = "listSessions",
            username = username // Although this might be redundant since it's in the query
        };
        string jsonMessage = JsonSerializer.Serialize(message);  // This creates a non-empty body.
        Console.WriteLine("Sending JSON: " + jsonMessage);
        ws.Send(jsonMessage);
    }
    else
    {
        Console.WriteLine("WebSocket connection is not open.");
    }
}



        private static char GetKey()
        {
            ConsoleKeyInfo keyInfo = Console.ReadKey(true);
            return keyInfo.KeyChar;
        }

        private static void OnMessageReceived(object? sender, MessageEventArgs e)
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

        private static void OnOpened(object? sender, EventArgs e)
        {
            Console.WriteLine("Connected!");
        }

        private static void OnError(object? sender, WebSocketSharp.ErrorEventArgs e)
        {
            Console.WriteLine("Error: " + e?.Message);
        }

        private static void OnClosed(object? sender, CloseEventArgs e)
        {
            Console.WriteLine($"Disconnected! Code: {e.Code}, Reason: {e.Reason}");
        }
    }
}
