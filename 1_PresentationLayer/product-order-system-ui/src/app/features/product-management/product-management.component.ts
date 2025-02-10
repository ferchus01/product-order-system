import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductFormComponent } from '../../shared/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Product {
  productId: number;
  name: string;
  price: number;
  categoryId: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule, MatDialogModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {
  displayedColumns: string[] = ['name', 'imageUrl', 'price', 'categoryId', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        // 1) Asignar los datos
        this.dataSource.data = products;

        // 2) Configurar la paginación
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  // 2. Filtro de búsqueda en la tabla
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // 3. Abrir el popup para crear un producto
  openProductDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe((updated: Product | undefined) => {
      if (updated) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(product: Product): void {
    if (!product.productId) return;

    const dialogRef = this.dialog.open(this.confirmDialog, {
      width: '350px',
      data: { name: product.name }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.productsService.deleteProduct(product.productId!).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(
              (p) => p.productId !== product.productId
            );
            this.snackBar.open(
              'Producto eliminado con éxito',
              'Cerrar',
              { duration: 3000, panelClass: ['success-snackbar'] }
            );
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            this.snackBar.open(
              'Error al eliminar el producto',
              'Cerrar',
              { duration: 5000, panelClass: ['error-snackbar'] }
            );
          }
        });
      }
    });
  }

}
