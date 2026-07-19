package com.acme.catalog.search;

import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SearchResultsView {

    public void render(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String query = request.getParameter("q");
        String encoded = htmlEncode(query == null ? "" : query);

        response.setContentType("text/html; charset=UTF-8");
        PrintWriter writer = response.getWriter();
        writer.write("<div class=\"search-summary\">Results for: ");
        writer.write(encoded);
        writer.write("</div>");
    }

    private String htmlEncode(String input) {
        StringBuilder sb = new StringBuilder(input.length());
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            switch (c) {
                case '&': sb.append("&amp;"); break;
                case '<': sb.append("&lt;"); break;
                case '>': sb.append("&gt;"); break;
                case '"': sb.append("&quot;"); break;
                case '\'': sb.append("&#39;"); break;
                default: sb.append(c);
            }
        }
        return sb.toString();
    }
}
