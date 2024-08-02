using SQLite;
using System;
using System.IO;
using Microsoft.Maui.Storage;

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
        const string APP_TAG = "DayOnesApp";

        // Method to initialize the database for a user on a local machine
        public static void InitializeUserDatabase(string username)
        {
            var dbPath = GetLocalDatabasePath(username);
            try
            {
                Console.WriteLine($"{APP_TAG}: Initializing database for user {username} at path: {dbPath}");
                using (var db = new SQLiteConnection(dbPath))
                {
                    db.CreateTable<D1Account>();
                }
                Console.WriteLine($"{APP_TAG}: Database and table created successfully.");
            }
            catch (SQLiteException ex)
            {
                Console.WriteLine($"{APP_TAG}: SQLite error initializing database: {ex.Message}\nStack Trace: {ex.StackTrace}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: General error initializing database: {ex.Message}\nStack Trace: {ex.StackTrace}");
            }
        }

        // Insert account details into the database
        public static void InsertD1Account(string username, D1Account account)
        {
            var dbPath = GetLocalDatabasePath(username);
            try
            {
                using (var db = new SQLiteConnection(dbPath))
                {
                    db.Insert(account);
                }
                Console.WriteLine($"{APP_TAG}: Account inserted successfully.");
            }
            catch (SQLiteException ex)
            {
                Console.WriteLine($"{APP_TAG}: SQLite error inserting account: {ex.Message}\nStack Trace: {ex.StackTrace}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: General error inserting account: {ex.Message}\nStack Trace: {ex.StackTrace}");
            }
        }

        // Fetch account details from the database
        public static D1Account GetD1Account(string username, int id)
        {
            var dbPath = GetDeviceDatabasePath(username);
            try
            {
                using (var db = new SQLiteConnection(dbPath))
                {
                    return db.Find<D1Account>(id);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error fetching account: {ex.Message}\nStack Trace: {ex.StackTrace}");
                return null;
            }
        }

        // Generate the database path on the local machine for testing
        private static string GetLocalDatabasePath(string username)
        {
            try
            {
                // Path for storing database files in your project directory
                var folderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "DayOnesDatabases");

                // Ensure the directory exists
                Directory.CreateDirectory(folderPath);

                // Return the path for the specific user's database file
                var dbPath = Path.Combine(folderPath, $"{username}_D1AccountDB.db");
                Console.WriteLine($"{APP_TAG}: Local Database Path: {dbPath}");
                return dbPath;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error getting local database path: {ex.Message}\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        // Generate the database path on the device
        private static string GetDeviceDatabasePath(string username)
        {
            try
            {
                // Use MAUI's app-specific storage to get a writable path on the device
                var folderPath = FileSystem.AppDataDirectory; // App-specific directory on the device
                Console.WriteLine($"{APP_TAG}: AppDataDirectory Path: {folderPath}");

                // Return the path for the specific user's database file on the device
                var dbPath = Path.Combine(folderPath, $"{username}_D1AccountDB.db");
                Console.WriteLine($"{APP_TAG}: Device Database Path: {dbPath}");
                return dbPath;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error getting device database path: {ex.Message}\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }

        // Copy the database from the local path to the device
        public static void CopyDatabaseToDevice(string username)
        {
            try
            {
                var localPath = GetLocalDatabasePath(username);
                var devicePath = GetDeviceDatabasePath(username);

                if (File.Exists(localPath))
                {
                    File.Copy(localPath, devicePath, true);
                    Console.WriteLine($"{APP_TAG}: Database copied to device successfully.");
                }
                else
                {
                    Console.WriteLine($"{APP_TAG}: Local database file not found.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{APP_TAG}: Error copying database to device: {ex.Message}\nStack Trace: {ex.StackTrace}");
                throw;
            }
        }
    }
}
