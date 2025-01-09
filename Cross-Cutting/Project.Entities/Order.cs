using System;
using System.Collections.Generic;

namespace Project.Entities;

public partial class Order
{
    public int OrderId { get; set; }

    public int CustomerId { get; set; }

    public DateTime? OrderDate { get; set; }

    public decimal TotalAmount { get; set; }

    public int OrderStatusId { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<OrderEvent> OrderEvents { get; set; } = new List<OrderEvent>();

    public virtual OrderStatus OrderStatus { get; set; } = null!;
}
