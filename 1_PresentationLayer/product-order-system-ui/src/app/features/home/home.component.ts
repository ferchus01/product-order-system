import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Product, ProductsService } from '../../core/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, ReactiveFormsModule, MatIconModule, MatChipsModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Categorías disponibles
  categories: string[] = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];
  products: Product[] = [];

  // Categoría seleccionada (para filtrar)
  selectedCategory: string | null = null;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.loadProducts();
  }

  // Productos disponibles
  // products = [
  //   {
  //     name: 'Celular Samsung',
  //     image: 'https://picsum.photos/seed/electronics/150/150',
  //     description: 'Último modelo con excelente cámara.',
  //     price: 1500,
  //     category: 'Electrónica',
  //   },
  //   {
  //     name: 'Laptop Lenovo',
  //     image: 'https://picsum.photos/seed/electronics/150/150',
  //     description: 'Potente y compacta.',
  //     price: 750,
  //     category: 'Electrónica',
  //   },
  //   {
  //     name: 'Camiseta Deportiva',
  //     image: 'https://picsum.photos/seed/electronics/150/150',
  //     description: 'Cómoda y transpirable.',
  //     price: 50,
  //     category: 'Ropa',
  //   },
  //   {
  //     name: 'Silla de Oficina',
  //     image: 'https://picsum.photos/seed/electronics/150/150',
  //     description: 'Ergonómica y ajustable.',
  //     price: 200,
  //     category: 'Hogar',
  //   },
  //   {
  //     name: 'Bicicleta de Montaña',
  //     image: 'https://picsum.photos/seed/electronics/150/150',
  //     description: 'Ideal para terrenos difíciles.',
  //     price: 600,
  //     category: 'Deportes',
  //   },
  // ];

  // Productos filtrados
  filteredProducts = this.products;

  // Método para filtrar productos por categoría
  filterByCategory(category: string | null) {
    // this.selectedCategory = category;
    // this.filteredProducts = category
    //   ? this.products.filter((product) => product.categoryId === category)
    //   : this.products;
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  buyProduct(product: Product): void {
    // Aquí creamos la orden con un solo producto
    // Podrías permitir elegir cantidad, etc.
    const orderRequest = {
      // Dependiendo de tu backend, podrías necesitar:
      // userId (si no lo deduces del token),
      // totalAmount, orderStatusId, orderDetails, etc.
      orderDetails: [
        {
          productId: product.productId,
          quantity: 1, // Por ejemplo, 1 unidad
          unitPrice: product.price
        }
      ]
    };

    this.ordersService.createOrder(orderRequest).subscribe({
      next: (createdOrder) => {
        // Mostrar snack de éxito
        this.snackBar.open('Orden creada exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        console.error('Error al crear orden:', err);
        this.snackBar.open('Ocurrió un error al crear la orden', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
