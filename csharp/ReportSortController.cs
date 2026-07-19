using System.Data.SqlClient;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace Analytics.Reporting.Web
{
    [ApiController]
    [Route("api/reports")]
    public class ReportSortController : ControllerBase
    {
        private const string ConnectionString =
            "Server=reporting.internal;Database=Metrics;Integrated Security=true";

        private static readonly Regex ColumnPattern = new Regex("^[A-Za-z0-9_]+$");

        [HttpGet("revenue")]
        public IActionResult GetRevenue([FromQuery] string sortColumn, [FromQuery] string direction)
        {
            if (!ColumnPattern.IsMatch(sortColumn))
            {
                return BadRequest("Unknown sort column");
            }

            string order = string.Equals(direction, "desc", System.StringComparison.OrdinalIgnoreCase)
                ? "DESC"
                : "ASC";

            var rows = new System.Collections.Generic.List<string>();

            using (var connection = new SqlConnection(ConnectionString))
            {
                var command = new SqlCommand();
                command.Connection = connection;
                command.CommandText =
                    "SELECT region, total FROM RevenueByRegion ORDER BY " + sortColumn + " " + order;

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        rows.Add(reader.GetString(0) + ":" + reader.GetDecimal(1));
                    }
                }
            }

            return Ok(rows);
        }
    }
}
