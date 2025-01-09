using System;
using System.Collections.Generic;

namespace Project.Entities;

public partial class OrderStatus
{
    public int OrderStatusId { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
