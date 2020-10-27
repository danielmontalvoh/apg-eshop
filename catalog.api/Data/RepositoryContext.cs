namespace catalog.api.Data
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
    using Models;
    using System;

    public class RepositoryContext : DbContext
    {
        public RepositoryContext (DbContextOptions<RepositoryContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            const ProductStatus DefaultProductStatus = ProductStatus.Undefined;
            ProductStatus productStatus = ProductStatus.Undefined;
            ValueConverter<ProductStatus, string> productStatusConverter = new ValueConverter<ProductStatus, string>(
                convertTo => convertTo.ToString(),
                convertFrom => Enum.TryParse(convertFrom, true, out productStatus)
                    ? productStatus
                    : DefaultProductStatus);

            modelBuilder
                .Entity<Product>()
                .Property(product => product.Status)
                .HasConversion(productStatusConverter);
        }
    }
}
