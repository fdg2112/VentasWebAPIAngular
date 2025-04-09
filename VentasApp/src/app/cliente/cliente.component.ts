import { Component } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { Cliente } from '../models/cliente';
import { SharedModule } from '../shared/shared.module'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-cliente',
  standalone: true, // 💥 fundamental
  imports: [ SharedModule ], // 💥 para usar *ngFor, pipes, etc.
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  public list: any[] = [];

  public displayedColumns: string[] = ['id', 'nombre'];

  constructor(private clienteService: ApiclienteService) {
    this.getClientes(); // 👈 lo llamás acá en el constructor o en ngOnInit
  }

  getClientes() {
    this.clienteService.getClientes().subscribe((response: Response<Cliente[]>) => {
      console.log(response);
      this.list = response.datos;
    });
  }
}
