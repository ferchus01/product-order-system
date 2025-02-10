import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'https://localhost:44394/api/orders';

  constructor(private http: HttpClient) { }

  createOrder(orderRequest: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, orderRequest);
  }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
