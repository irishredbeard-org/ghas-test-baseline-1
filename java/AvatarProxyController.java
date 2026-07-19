package com.acme.profile.avatar;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AvatarProxyController {

    private static final String ALLOWED_HOST = "cdn.avatars.example.com";

    public void proxy(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String src = request.getParameter("src");

        URI uri = URI.create(src);
        if (!"https".equalsIgnoreCase(uri.getScheme())
                || !ALLOWED_HOST.equalsIgnoreCase(uri.getHost())) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        URL url = uri.toURL();
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setConnectTimeout(3000);
        connection.setReadTimeout(3000);

        response.setContentType(connection.getContentType());
        try (InputStream in = connection.getInputStream()) {
            byte[] buffer = new byte[8192];
            int read;
            while ((read = in.read(buffer)) != -1) {
                response.getOutputStream().write(buffer, 0, read);
            }
        }
    }
}
