package com.acme.warehouse.inventory;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

public class InventoryColumnQuery {

    private static final List<String> PROJECTABLE = Arrays.asList(
            "sku", "quantity_on_hand", "reorder_point", "bin_location", "updated_at");

    private final Connection connection;

    public InventoryColumnQuery(Connection connection) {
        this.connection = connection;
    }

    public ResultSet fetch(HttpServletRequest request) throws Exception {
        String field = request.getParameter("field");

        String column = "sku";
        if (field != null && PROJECTABLE.contains(field)) {
            column = field;
        }

        String sql = "SELECT warehouse_id, " + column
                + " FROM inventory_levels WHERE active = 1";

        Statement statement = connection.createStatement();
        return statement.executeQuery(sql);
    }
}
