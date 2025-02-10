import { Component } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  orders: any[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadMyOrders();
  }

  loadMyOrders(): void {
    this.ordersService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Error al cargar órdenes:', err);
      }
    });
  }
}
