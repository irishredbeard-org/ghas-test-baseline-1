package com.acme.devices.firmware;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FirmwareImageServlet {

    private static final File FIRMWARE_DIR = new File("/srv/firmware");

    public void serve(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String model = request.getParameter("model");
        String version = request.getParameter("version");

        if (!isToken(model) || !isVersion(version)) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        File image = new File(FIRMWARE_DIR, model + "-" + version + ".bin");
        response.setContentType("application/octet-stream");
        Files.copy(image.toPath(), response.getOutputStream());
    }

    private boolean isToken(String value) {
        return value != null && value.matches("[a-z0-9]{2,32}");
    }

    private boolean isVersion(String value) {
        return value != null && value.matches("\\d+\\.\\d+\\.\\d+");
    }
}
