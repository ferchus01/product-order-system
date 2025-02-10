import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { Product, ProductsService } from '../../core/services/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule, MatInputModule, FormsModule, MatDialogModule, MatButtonModule, MatOptionModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  product = this.data || {
    name: '',
    price: 0,
    categoryId: null,
    description: '',
    image: '',
    stock: 0,
  };
  categories: { categoryId: number, description: string }[] = [];
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isUploading = false;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.product = { ...this.data };
      // Prepara la imagen a mostrar
      if (this.product.image) {
        this.previewUrl = this.product.image;
      }
    } else {
      // Modo nuevo producto
      this.product = {
        name: '',
        price: 0,
        categoryId: null,
        description: '',
        image: '',
        stock: 0,
      };
    }

    // Cargar categorías desde la BD
    this.productService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.previewUrl = e.target.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async uploadImage(): Promise<string> {
    if (!this.selectedFile) {
      return this.product.image || ''; // Mantén la URL existente si no se seleccionó una nueva imagen
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', 'product-order-system'); // Cambia por tu preset
    formData.append('folder', 'images'); // Opcional: carpeta específica en Cloudinary

    const response = await fetch(`https://api.cloudinary.com/v1_1/dxxj0ld6u/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    this.isUploading = false;

    if (data.secure_url) {
      return data.secure_url; // Devuelve la URL de la imagen subida
    } else {
      console.error('Error al subir la imagen:', data);
      throw new Error('Error al subir la imagen');
    }
  }

  onSubmit(): void {
    this.isUploading = true;
    this.uploadImage().then((url) => {
      this.product.image = url;

      // decide si es update o create
      let obs: Observable<Product>;
      if (this.product.productId) {
        obs = this.productService.updateProduct(this.product.productId, this.product);
      } else {
        obs = this.productService.createProduct(this.product);
      }

      obs.subscribe({
        next: (savedProd) => {
          const msg = this.product.productId
            ? 'Producto actualizado con éxito'
            : 'Producto creado con éxito';

          this.snackBar.open(msg, 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });

          this.dialogRef.close(savedProd);
          this.isUploading = false;
        },
        error: (err) => {
          console.error('Error al guardar el producto:', err);
          this.snackBar.open('Ocurrió un error al guardar el producto', 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.isUploading = false;
        }
      });
    }).catch(err => {
      console.error('Error al subir la imagen:', err);
      this.snackBar.open('Ocurrió un error al subir la imagen', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      this.isUploading = false;
    });
  }
}
