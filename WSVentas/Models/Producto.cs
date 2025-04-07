using System;
using System.Collections.Generic;

namespace WSVentas.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public decimal PrecioUnitario { get; set; }

    public decimal Costo { get; set; }

    public virtual ICollection<Concepto> Conceptos { get; set; } = new List<Concepto>();
}
