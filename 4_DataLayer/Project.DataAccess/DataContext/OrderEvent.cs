using System;
using System.Collections.Generic;

namespace Project.DataAccess.DataContext;

public partial class OrderEvent
{
    public int EventId { get; set; }

    public int OrderId { get; set; }

    public string PreviousStatus { get; set; } = null!;

    public string NewStatus { get; set; } = null!;

    public DateTime? EventDate { get; set; }

    public virtual Order Order { get; set; } = null!;
}
