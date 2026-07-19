using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;

namespace Enterprise.Directory.Groups
{
    public class GroupMembershipService
    {
        private static readonly string[] KnownGroups =
        {
            "engineering", "finance", "operations", "support", "leadership"
        };

        private readonly string _ldapPath;

        public GroupMembershipService(string ldapPath)
        {
            _ldapPath = ldapPath;
        }

        public IReadOnlyList<string> ListMembers(string group)
        {
            var members = new List<string>();

            if (!KnownGroups.Contains(group))
            {
                return members;
            }

            using (var root = new DirectoryEntry(_ldapPath))
            {
                var searcher = new DirectorySearcher(root)
                {
                    Filter = "(&(objectClass=group)(cn=" + group + "))"
                };

                foreach (SearchResult result in searcher.FindAll())
                {
                    members.Add(result.Path);
                }
            }

            return members;
        }
    }
}
