using System.Net.Http;
using System.Threading.Tasks;

namespace DayOnes.UtilityClass
{
    public class UserService
    {
        private readonly HttpClient _httpClient;

        public UserService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<bool> IsUsernameAvailable(string username)
        {
            var url = LambdaUrls.GetUsernameCheckUrl(username);
            var response = await _httpClient.GetAsync(url);

            return response.StatusCode == System.Net.HttpStatusCode.Accepted;
        }

        public async Task<bool> TryRegisterUser(string userName, string password, string fullName, string email, string phone, string instagramHandle, string role)
        {
            try
            {
                var url = $"https://y7owu4h5aixdy4zvqxpabpvdbm0ilbnw.lambda-url.us-east-1.on.aws/?Username={Uri.EscapeDataString(userName)}&Password={Uri.EscapeDataString(password)}&FullName={Uri.EscapeDataString(fullName)}&Email={Uri.EscapeDataString(email)}&Phone={Uri.EscapeDataString(phone)}&Instragram={Uri.EscapeDataString(instagramHandle)}&Role={Uri.EscapeDataString(role)}";
                var response = await _httpClient.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                if (response.StatusCode == System.Net.HttpStatusCode.Created)
                {
                    Console.WriteLine("Registration successful: " + content);
                    return true;
                }
                else
                {
                    Console.WriteLine("Registration failed: " + content);
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during TryRegisterUser: {ex.Message}");
                return false;
            }
        }
    }
}
