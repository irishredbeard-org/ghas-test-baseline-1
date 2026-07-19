using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Commerce.Catalog.Data
{
    public class ProductCatalogQueryService
    {
        private static readonly string[] FilterableColumns =
        {
            "sku", "name", "brand", "category", "price", "stock_level"
        };

        private readonly string _connectionString;

        public ProductCatalogQueryService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IReadOnlyList<string> Search(string column, string term)
        {
            if (!FilterableColumns.Contains(column))
            {
                return new List<string>();
            }

            var results = new List<string>();

            using (var connection = new SqlConnection(_connectionString))
            {
                var command = connection.CreateCommand();
                command.CommandText =
                    "SELECT sku FROM Products WHERE " + column + " LIKE @term";
                command.Parameters.AddWithValue("@term", "%" + term + "%");

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        results.Add(reader.GetString(0));
                    }
                }
            }

            return results;
        }
    }
}
