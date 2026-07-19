using System.IO;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace Billing.Documents.Web
{
    [ApiController]
    [Route("api/invoices")]
    public class InvoiceDocumentController : ControllerBase
    {
        private const string StorageRoot = "/var/lib/billing/invoices";

        private static readonly Regex DocumentName = new Regex("^[A-Za-z0-9._-]+$");

        [HttpGet("{name}")]
        public IActionResult Download(string name)
        {
            if (!DocumentName.IsMatch(name))
            {
                return BadRequest("Invalid document name");
            }

            string fullPath = Path.Combine(StorageRoot, name);

            if (!System.IO.File.Exists(fullPath))
            {
                return NotFound();
            }

            byte[] bytes = System.IO.File.ReadAllBytes(fullPath);
            return File(bytes, "application/pdf", name);
        }
    }
}
