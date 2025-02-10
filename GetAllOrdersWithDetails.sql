SELECT o.OrderId,
       c.CustomerName,
       c.Email,
       o.OrderDate,
       os.StatusName,
       od.OrderDetailId,
       od.ProductId,
       p.Name AS ProductName,
       od.Quantity,
       od.UnitPrice
FROM Orders o
JOIN Customers c ON o.CustomerId = c.CustomerId
JOIN OrderStatus os ON o.OrderStatusId = os.OrderStatusId
JOIN OrderDetails od ON o.OrderId = od.OrderId
JOIN Products p ON od.ProductId = p.ProductId
ORDER BY o.OrderDate DESC;
