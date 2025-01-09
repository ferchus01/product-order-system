import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductFormComponent } from '../../shared/product-form/product-form.component';

export interface Product {
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {
  displayedColumns: string[] = ['name', 'imageUrl', 'price', 'category', 'actions'];
  dataSource = new MatTableDataSource<Product>([
    { name: 'Laptop', price: 1200, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
    { name: 'Smartphone', price: 800, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
    { name: 'Smartphone', price: 800, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
    { name: 'Smartphone', price: 800, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
    { name: 'Smartphone', price: 800, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
    { name: 'Smartphone', price: 800, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
    { name: 'Smartphone', price: 800, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
    { name: 'Smartphone', price: 800, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
    { name: 'Smartphone', price: 800, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/electronics/150/150' },
  ]);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex((p) => p.name === product.name);
        this.dataSource.data[index] = result;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  deleteProduct(product: Product): void {
    this.dataSource.data = this.dataSource.data.filter((p) => p !== product);
  }
}
