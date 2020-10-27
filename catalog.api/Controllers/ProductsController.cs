namespace catalog.api.Controllers
{
    using catalog.api.Data;
    using catalog.api.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly RepositoryContext _context;
        private readonly IDataRepository<Product> _products;

        public ProductsController(RepositoryContext context, IDataRepository<Product> products)
        {
            _context = context;
            _products = products;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct([FromRoute] int id, [FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product entity = await _context.Products.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            entity.Description = product.Description;
            entity.Brand = product.Brand;
            entity.Model = product.Model;
            entity.UnitPrice = product.UnitPrice;
            entity.DiscountPercentage = product.DiscountPercentage;
            entity.ModifiedBy = Environment.UserName;
            entity.ModifiedAt = DateTime.Now;
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                _products.Update(entity);
                _ = await _products.SaveAsync(entity);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }


        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _products.Add(product);
            _ = await _products.SaveAsync(product);
            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            product.ModifiedBy = Environment.UserName;
            product.ModifiedAt = DateTime.Now;
            product.Status = ProductStatus.Deleted;
            _context.Entry(product).State = EntityState.Modified;
            _ = await _products.SaveAsync(product);

            return Ok(product);
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
