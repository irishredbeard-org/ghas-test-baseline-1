package com.acme.support.feedback;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FeedbackConfirmationView {

    private static final List<String> CATEGORIES = Arrays.asList(
            "billing", "technical", "account", "general");

    public void render(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        String category = request.getParameter("category");

        String label = "general";
        if (category != null && CATEGORIES.contains(category)) {
            label = category;
        }

        response.setContentType("text/html; charset=UTF-8");
        PrintWriter writer = response.getWriter();
        writer.write("<p>Thanks for your <strong>");
        writer.write(label);
        writer.write("</strong> feedback.</p>");
    }
}
