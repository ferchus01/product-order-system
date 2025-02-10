import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  productId?: number;  // opcional si la BD asigna auto-increment
  name: string;
  price: number;
  categoryId: number;  // si usas ID de categoría
  description: string;
  image?: string;
  createdDate: Date;
  stock: number;
}
export interface Category {
  categoryId: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'https://localhost:44394/api/products';

  constructor(private http: HttpClient) {}

  // 1. Obtener la lista de productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  // 2. Obtener un producto por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // 3. Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // 4. Actualizar un producto existente
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  // 5. Eliminar un producto
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
}
