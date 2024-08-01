using SQLite;
using System;
using System.IO;

namespace DayOnes.UtilityClass
{
    public class D1Account
    {
        [PrimaryKey, AutoIncrement]
        public int ID { get; set; }
        public string AccountID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string License { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Instagram { get; set; }
        public int D1Type2 { get; set; }
        public string AcntCreatTS { get; set; }
        public int TOSAcpt { get; set; }
        public string TOSAcptTS { get; set; }
        public string DevName { get; set; }
        public int PremiumAcct { get; set; }
        public int FanGift { get; set; }
        public string GiftTS { get; set; }
        public double GPSLocationLat { get; set; }
        public double GPSLocationLon { get; set; }
        public string GPSLastTS { get; set; }
        public double GPSGeoHash { get; set; }
        public string GPSTS { get; set; }
        public string GPSCity { get; set; }
        public int HFanNotifDM { get; set; }
        public int HFanNotifD1 { get; set; }
        public string InviteTS { get; set; }
        public string UploadStatus { get; set; }
        public string UploadLatestTS { get; set; }
        public string HNewGrp { get; set; }
        public int HSignatureCount { get; set; }
        public int HPhoto270Count { get; set; }
        public int HPhoto100Count { get; set; }
        public int HInviteReset { get; set; }
        public string HInviteTS { get; set; }
        public string HInviteReminder { get; set; }
        public int HLikeCount { get; set; }
        public string NotPushOn { get; set; }
        public string NotSndOn { get; set; }
        public int GPSRange { get; set; }
        public int GEOHash { get; set; }
        public string SessionId { get; set; }
        public string ChatSessionId { get; set; }
        public string GroupName { get; set; }
        public string InitiatedBy { get; set; }
        public string SessionType { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public static class D1AccountMethods
    {
        public static void InitializeUserDatabase(string username)
        {
            var dbPath = GetDatabasePath(username);
            try
            {
                Console.WriteLine($"Initializing database for user {username} at path: {dbPath}");
                using (var db = new SQLiteConnection(dbPath))
                {
                    db.CreateTable<D1Account>();
                }
                Console.WriteLine("Database and table created successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error initializing database: {ex.Message}");
            }
        }

        public static void InsertD1Account(string username, D1Account account)
        {
            var dbPath = GetDatabasePath(username);
            try
            {
                using (var db = new SQLiteConnection(dbPath))
                {
                    db.Insert(account);
                }
                Console.WriteLine("Account inserted successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inserting account: {ex.Message}");
            }
        }

        public static D1Account GetD1Account(string username, int id)
        {
            var dbPath = GetDatabasePath(username);
            try
            {
                using (var db = new SQLiteConnection(dbPath))
                {
                    return db.Find<D1Account>(id);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching account: {ex.Message}");
                return null;
            }
        }

        private static string GetDatabasePath(string username)
        {
            // Set the database path to a common folder accessible by both the app and VSCode
            // Ensure the path is unique per user to avoid conflicts
            var folderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "DayOnesDatabases");
            Directory.CreateDirectory(folderPath); // Ensure the directory exists
            return Path.Combine(folderPath, $"{username}_D1AccountDB.db");
        }
    }
}
