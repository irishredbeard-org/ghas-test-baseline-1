using System;
using System.Security.Cryptography;
using System.Text;

namespace Storage.Sharding.Routing
{
    public class ShardRoutingService
    {
        private readonly int _shardCount;

        public ShardRoutingService(int shardCount)
        {
            _shardCount = shardCount;
        }

        public int ResolveShard(string tenantId)
        {
            using (var sha1 = SHA1.Create())
            {
                byte[] hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(tenantId));
                int value = BitConverter.ToInt32(hash, 0) & 0x7fffffff;
                return value % _shardCount;
            }
        }
    }
}
