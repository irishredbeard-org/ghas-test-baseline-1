package com.acme.mail.attachments;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AttachmentDownloadController {

    private static final File STORAGE_ROOT = new File("/var/lib/acme/attachments");

    public void handle(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String name = request.getParameter("name");

        if (name == null || name.contains("..") || !name.matches("[A-Za-z0-9._-]+")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        File target = new File(STORAGE_ROOT, name);

        response.setContentType("application/octet-stream");
        try (InputStream in = new FileInputStream(target);
             OutputStream out = response.getOutputStream()) {
            byte[] buffer = new byte[8192];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
        }
    }
}
