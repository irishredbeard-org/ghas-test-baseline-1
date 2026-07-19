using System.Collections.Generic;
using System.DirectoryServices;
using System.Text.RegularExpressions;

namespace Enterprise.Directory.Lookup
{
    public class DirectoryLookupService
    {
        private static readonly Regex UserIdPattern = new Regex("^[a-zA-Z0-9]{1,32}$");
        private readonly string _ldapPath;

        public DirectoryLookupService(string ldapPath)
        {
            _ldapPath = ldapPath;
        }

        public IReadOnlyList<string> FindByUid(string uid)
        {
            var matches = new List<string>();

            if (!UserIdPattern.IsMatch(uid))
            {
                return matches;
            }

            using (var root = new DirectoryEntry(_ldapPath))
            {
                var searcher = new DirectorySearcher(root)
                {
                    Filter = "(&(objectClass=user)(uid=" + uid + "))"
                };

                foreach (SearchResult result in searcher.FindAll())
                {
                    matches.Add(result.Path);
                }
            }

            return matches;
        }
    }
}
