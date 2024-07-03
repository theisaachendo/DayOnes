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

        public async Task<bool> TryRegisterUser(string username, string password, string fullName, string email, string phone, string instagram, string d1Type2)
        {
            var url = LambdaUrls.GetUsernameCheckAndAddUrl(username, password, fullName, email, phone, instagram, d1Type2);
            Console.WriteLine($"Checking and registering username with URL: {url}");
            var response = await _httpClient.GetAsync(url);

            return response.StatusCode == System.Net.HttpStatusCode.Created;
        }
    }
}
