namespace DayOnes.UtilityClass
{
    public static class LambdaUrls
    {
        public static readonly string BaseUrl = "https://y7owu4h5aixdy4zvqxpabpvdbm0ilbnw.lambda-url.us-east-1.on.aws/";

        public static string GetUsernameCheckUrl(string username)
        {
            return $"{BaseUrl}?Username={username}";
        }

        public static string GetUsernameCheckAndAddUrl(string username, string password, string fullName, string email, string phone, string instagram, string d1Type2)
        {
            return $"{BaseUrl}?Username={username}&Password={password}&FullName={fullName}&Email={email}&Phone={phone}&Instragram={instagram}&D1Type2={d1Type2}";
        }
    }
}








