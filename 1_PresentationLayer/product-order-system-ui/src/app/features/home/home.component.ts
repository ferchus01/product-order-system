import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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

  // Categoría seleccionada (para filtrar)
  selectedCategory: string | null = null;

  // Productos disponibles
  products = [
    {
      name: 'Celular Samsung',
      image: 'https://picsum.photos/seed/electronics/150/150',
      description: 'Último modelo con excelente cámara.',
      price: 1500,
      category: 'Electrónica',
    },
    {
      name: 'Laptop Lenovo',
      image: 'https://picsum.photos/seed/electronics/150/150',
      description: 'Potente y compacta.',
      price: 750,
      category: 'Electrónica',
    },
    {
      name: 'Camiseta Deportiva',
      image: 'https://picsum.photos/seed/electronics/150/150',
      description: 'Cómoda y transpirable.',
      price: 50,
      category: 'Ropa',
    },
    {
      name: 'Silla de Oficina',
      image: 'https://picsum.photos/seed/electronics/150/150',
      description: 'Ergonómica y ajustable.',
      price: 200,
      category: 'Hogar',
    },
    {
      name: 'Bicicleta de Montaña',
      image: 'https://picsum.photos/seed/electronics/150/150',
      description: 'Ideal para terrenos difíciles.',
      price: 600,
      category: 'Deportes',
    },
  ];

  // Productos filtrados
  filteredProducts = this.products;

  // Método para filtrar productos por categoría
  filterByCategory(category: string | null) {
    this.selectedCategory = category;
    this.filteredProducts = category
      ? this.products.filter((product) => product.category === category)
      : this.products;
  }
}
