package com.acme.netops.diagnostics;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

public class DnsDiagnosticsRunner {

    public Process resolve(HttpServletRequest request) throws IOException {
        String host = request.getParameter("host");

        if (host == null || !host.matches("[A-Za-z0-9.-]{1,253}") || host.contains("..")) {
            throw new IllegalArgumentException("invalid host");
        }

        String[] command = { "/usr/bin/dig", "+short", host };
        return Runtime.getRuntime().exec(command);
    }
}
