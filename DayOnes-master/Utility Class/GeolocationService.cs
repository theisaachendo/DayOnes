using System;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Maui.Devices.Sensors;

namespace MyGeolocationLibrary
{
    public class LocationService
    {
        public string GetCurrentTimestamp()
        {
            return DateTime.Now.ToString("yyyyMMdd'T'HHmmss", CultureInfo.InvariantCulture);
        }

        public async Task<(double Latitude, double Longitude)> GetCurrentLocationAsync()
        {
            try
            {
                var location = await Geolocation.GetLocationAsync(new GeolocationRequest
                {
                    DesiredAccuracy = GeolocationAccuracy.Medium,
                    Timeout = TimeSpan.FromSeconds(30)
                });

                if (location != null)
                {
                    return (location.Latitude, location.Longitude);
                }
                else
                {
                    throw new Exception("Unable to retrieve location.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Unable to retrieve location.", ex);
            }
        }

        public string GetGeohash(double latitude, double longitude, int precision = 7)
        {
            const string Base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
            var latInterval = (-90.0, 90.0);
            var lonInterval = (-180.0, 180.0);
            var isEven = true;
            var bit = 0;
            var ch = 0;
            var geohash = new StringBuilder();

            while (geohash.Length < precision)
            {
                double mid;
                if (isEven)
                {
                    mid = (lonInterval.Item1 + lonInterval.Item2) / 2;
                    if (longitude > mid)
                    {
                        ch |= 1 << (4 - bit);
                        lonInterval.Item1 = mid;
                    }
                    else
                    {
                        lonInterval.Item2 = mid;
                    }
                }
                else
                {
                    mid = (latInterval.Item1 + latInterval.Item2) / 2;
                    if (latitude > mid)
                    {
                        ch |= 1 << (4 - bit);
                        latInterval.Item1 = mid;
                    }
                    else
                    {
                        latInterval.Item2 = mid;
                    }
                }

                isEven = !isEven;
                if (bit < 4)
                {
                    bit++;
                }
                else
                {
                    geohash.Append(Base32[ch]);
                    bit = 0;
                    ch = 0;
                }
            }

            return geohash.ToString();
        }

        public async Task<string> GetLocaleAsync(double latitude, double longitude)
        {
            try
            {
                var placemarks = await Geocoding.GetPlacemarksAsync(latitude, longitude);
                var placemark = placemarks?.FirstOrDefault();

                if (placemark != null)
                {
                    return $"{placemark.Locality}, {placemark.AdminArea}";
                }

                return "Unknown location";
            }
            catch (Exception ex)
            {
                throw new Exception("Unable to retrieve locale.", ex);
            }
        }

        public async Task<(string Timestamp, double Latitude, double Longitude, string Geohash, string Locale)> GetAllDataAsync()
        {
            try
            {
                // Get the current timestamp
                var timestamp = GetCurrentTimestamp();

                // Get the current location
                var (latitude, longitude) = await GetCurrentLocationAsync();

                // Get the geohash for the location
                var geohash = GetGeohash(latitude, longitude);

                // Get the locale (city, admin area) for the location
                var locale = await GetLocaleAsync(latitude, longitude);

                // Return all data as a tuple
                return (timestamp, latitude, longitude, geohash, locale);
            }
            catch (Exception ex)
            {
                // Handle exceptions
                throw new Exception("Unable to retrieve all data.", ex);
            }
        }
    }
}
