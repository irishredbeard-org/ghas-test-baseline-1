using System.Security.Cryptography;
using System.Text;

namespace Web.Http.Caching
{
    public class ResponseETagFilter
    {
        public string ComputeETag(byte[] body)
        {
            using (var sha1 = SHA1.Create())
            {
                byte[] hash = sha1.ComputeHash(body);
                var sb = new StringBuilder();
                foreach (byte b in hash)
                {
                    sb.Append(b.ToString("x2"));
                }
                return "\"" + sb.ToString() + "\"";
            }
        }

        public bool Matches(byte[] body, string incomingETag)
        {
            return ComputeETag(body) == incomingETag;
        }
    }
}
