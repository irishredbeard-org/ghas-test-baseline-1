package com.acme.security.audit;

import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;

public class AuditTrailWriter {

    private static final Logger logger = Logger.getLogger(AuditTrailWriter.class.getName());

    public void recordAccess(HttpServletRequest request, String action) {
        String actor = request.getParameter("actor");
        String resource = request.getParameter("resource");

        String safeActor = actor == null ? "unknown" : actor.replaceAll("[\\r\\n]", "");
        String safeResource = resource == null ? "-" : resource.replaceAll("[\\r\\n]", "");

        logger.info("audit action=" + action + " actor=" + safeActor
                + " resource=" + safeResource);
    }
}
