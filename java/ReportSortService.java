package com.acme.reporting.query;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.http.HttpServletRequest;

public class ReportSortService {

    private final Connection connection;

    public ReportSortService(Connection connection) {
        this.connection = connection;
    }

    public ResultSet listInvoices(HttpServletRequest request) throws Exception {
        String sortColumn = request.getParameter("sort");
        String direction = request.getParameter("dir");

        if (sortColumn == null || !sortColumn.matches("[A-Za-z0-9_]+")) {
            sortColumn = "created_at";
        }

        String orderDirection = "ASC";
        if ("desc".equalsIgnoreCase(direction)) {
            orderDirection = "DESC";
        }

        String sql = "SELECT id, customer_id, amount, created_at FROM invoices "
                + "ORDER BY " + sortColumn + " " + orderDirection;

        Statement statement = connection.createStatement();
        return statement.executeQuery(sql);
    }
}
