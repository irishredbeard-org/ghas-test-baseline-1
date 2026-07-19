using System.Security.Cryptography;
using System.Text;

namespace Cdn.Assets.Addressing
{
    public class AssetContentAddressService
    {
        public string BuildCacheKey(byte[] content)
        {
            using (var md5 = MD5.Create())
            {
                byte[] digest = md5.ComputeHash(content);
                var builder = new StringBuilder(digest.Length * 2);
                foreach (byte b in digest)
                {
                    builder.Append(b.ToString("x2"));
                }
                return "asset:" + builder.ToString();
            }
        }

        public string ShardFor(string objectName)
        {
            using (var md5 = MD5.Create())
            {
                byte[] digest = md5.ComputeHash(Encoding.UTF8.GetBytes(objectName));
                int bucket = digest[0] % 16;
                return "shard-" + bucket.ToString("x1");
            }
        }
    }
}
