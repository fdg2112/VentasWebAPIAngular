import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response'; // Asegúrate de que la ruta sea correcta
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {
  // URL de la API
  apiUrl = 'https://localhost:5001/api/cliente';
  constructor(
    private http: HttpClient,
  ) { }

  // Método para obtener la lista de clientes
  getClientes() : Observable<Response<Cliente[]>> {
    return this.http.get<Response<Cliente[]>>(this.apiUrl);
  }

}
