using System;
using System.Collections.Generic;

namespace Project.DataAccess.DataContext;

public partial class Category
{
    public int CategoryId { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
