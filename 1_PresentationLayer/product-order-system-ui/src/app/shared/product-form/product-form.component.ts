import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  product = this.data || { name: '', price: 0, category: '', imageUrl: '' };
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isUploading = false;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
      return this.product.imageUrl || ''; // Mantén la URL existente si no se seleccionó una nueva imagen
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

  async onSubmit(): Promise<void> {
    try {
      this.product.imageUrl = await this.uploadImage(); // Sube la imagen y guarda la URL
      this.dialogRef.close(this.product); // Cierra el diálogo con los datos del producto
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  }
}
