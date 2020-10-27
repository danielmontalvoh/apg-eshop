namespace catalog.api.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// Representa la informaci�n de un bot del sistema.
    /// </summary>
    [Table("Products")]
    public class Product
    {
        public Product()
        {
            this.CreatedAt = DateTime.Now;
            this.CreatedBy = Environment.UserName;
            this.Status = ProductStatus.Created;
        }

        /// <summary>
        /// Obtiene o establece la marca del producto.
        /// </summary>
        [Required]
        [StringLength(100)]
        public string Brand { get; set; }

        /// <summary>
        /// Obtiene o establece la fecha y hora en que se cre� el registro.
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Obtiene o establece el identificador del usuario que cre� el registro.
        /// </summary>
        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }

        /// <summary>
        /// Obtiene o establece la descripci�n del producto.
        /// </summary>
        [Required]
        [StringLength(250)]
        public string Description { get; set; }

        /// <summary>
        /// Obtiene o establece el porcentaje de descuento del producto, expresado de 0 a 100.
        /// </summary>
        public int DiscountPercentage { get; set; }

        /// <summary>
        /// Obtiene o establece el modelo del producto.
        /// </summary>
        [Required]
        [StringLength(250)]
        public string Model { get; set; }

        /// <summary>
        /// Obtiene o establece la fecha y hora en que se modific� por �ltima vez el registro en el sistema.
        /// </summary>
        public DateTime? ModifiedAt { get; set; }

        /// <summary>
        /// Obtiene o establece el nombre del �ltimo usuario que modific� por �ltima vez el registro en el sistema.
        /// </summary>
        [StringLength(50)]
        public string ModifiedBy { get; set; }

        /// <summary>
        /// Obtiene o establece el identificador un�voco del producto en el sistema.
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        /// <summary>
        /// Obtiene o establece el estado del producto.
        /// </summary>
        public ProductStatus Status { get; set; }

        /// <summary>
        /// Obtiene o establece el valor o precio unitario del producto.
        /// </summary>
        [Required]
        public decimal UnitPrice { get; set; }
    }
}