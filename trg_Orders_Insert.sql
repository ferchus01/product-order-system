CREATE TRIGGER trg_Orders_Insert
ON dbo.Orders
AFTER INSERT
AS
BEGIN
   INSERT INTO OrderEvents(OrderId, PreviousStatus, NewStatus, EventDate)
   SELECT i.OrderId, NULL, i.OrderStatusId, GETDATE()
   FROM inserted i;
END;