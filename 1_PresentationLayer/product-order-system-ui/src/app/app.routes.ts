import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { ProductManagementComponent } from './features/product-management/product-management.component';
import { ProductFormComponent } from './shared/product-form/product-form.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { MyOrdersComponent } from './features/my-orders/my-orders.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'product', component: ProductManagementComponent, canActivate: [authGuardGuard] },
  { path: 'myOrders', component: MyOrdersComponent, canActivate: [authGuardGuard] },
  { path: '**', redirectTo: '' }
];
