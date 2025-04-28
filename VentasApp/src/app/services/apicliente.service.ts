import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response'; // Asegúrate de que la ruta sea correcta
import { Cliente } from '../models/cliente';

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

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

  // Método para obtener un cliente por ID
  getCliente(id: number) : Observable<Response<Cliente>> {
    return this.http.get<Response<Cliente>>(`${this.apiUrl}/${id}`);
  }
  
  // Método para crear un nuevo cliente
  createCliente(cliente: Cliente) : Observable<Response<Cliente>> {
    return this.http.post<Response<Cliente>>(this.apiUrl, cliente, httpOptions);
  }

  // Método para actualizar un cliente existente
  updateCliente(cliente: Cliente) : Observable<Response<Cliente>> {
    return this.http.put<Response<Cliente>>(`${this.apiUrl}/${cliente.id}`, cliente, httpOptions);
  }

  // Método para eliminar un cliente
  deleteCliente(id: number) : Observable<Response<Cliente>> {
    return this.http.delete<Response<Cliente>>(`${this.apiUrl}/${id}`);
  }
}
