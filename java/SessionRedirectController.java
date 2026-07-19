package com.acme.web.session;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SessionRedirectController {

    public void afterLogin(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        String next = request.getParameter("next");

        String destination = "/dashboard";
        if (next != null
                && next.startsWith("/")
                && !next.startsWith("//")
                && !next.startsWith("/\\")) {
            destination = next;
        }

        response.sendRedirect(destination);
    }
}
