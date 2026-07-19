package com.acme.identity.directory;

import java.util.Hashtable;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.servlet.http.HttpServletRequest;

public class DirectoryLookupService {

    private static final String BASE_DN = "ou=people,dc=acme,dc=com";

    public SearchResult findUser(HttpServletRequest request) throws Exception {
        String uid = request.getParameter("uid");

        if (uid == null || !uid.matches("[a-z0-9]{3,20}")) {
            throw new IllegalArgumentException("invalid identifier");
        }

        Hashtable<String, String> env = new Hashtable<>();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, "ldap://directory.internal.acme.com:389");

        DirContext ctx = new InitialDirContext(env);
        SearchControls controls = new SearchControls();
        controls.setSearchScope(SearchControls.SUBTREE_SCOPE);

        String filter = "(&(objectClass=inetOrgPerson)(uid=" + uid + "))";
        NamingEnumeration<SearchResult> results = ctx.search(BASE_DN, filter, controls);

        return results.hasMore() ? results.next() : null;
    }
}
