using System.IO;
using System.Text.RegularExpressions;

namespace Devices.Provisioning.Storage
{
    public class FirmwareImageService
    {
        private static readonly Regex ImageToken = new Regex("^[a-z0-9]{2,40}$");

        private readonly string _baseDirectory;

        public FirmwareImageService(string baseDirectory)
        {
            _baseDirectory = baseDirectory;
        }

        public Stream OpenImage(string model, string version)
        {
            if (!ImageToken.IsMatch(model) || !ImageToken.IsMatch(version))
            {
                throw new FileNotFoundException("Unknown firmware image");
            }

            string fileName = model + "-" + version + ".bin";
            string path = Path.Combine(_baseDirectory, fileName);

            return new FileStream(path, FileMode.Open, FileAccess.Read);
        }
    }
}
