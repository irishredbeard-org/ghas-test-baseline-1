package com.acme.reporting.export;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.http.HttpServletRequest;

public class ExportProfileController {

    private final Connection connection;

    public ExportProfileController(Connection connection) {
        this.connection = connection;
    }

    public ResultSet query(HttpServletRequest request) throws Exception {
        String groupBy = request.getParameter("groupBy");

        String dimension;
        switch (groupBy == null ? "" : groupBy) {
            case "region":
                dimension = "region_code";
                break;
            case "channel":
                dimension = "sales_channel";
                break;
            case "segment":
                dimension = "customer_segment";
                break;
            default:
                dimension = "region_code";
        }

        String sql = "SELECT " + dimension + ", SUM(amount) AS total "
                + "FROM orders GROUP BY " + dimension;

        Statement statement = connection.createStatement();
        return statement.executeQuery(sql);
    }
}
