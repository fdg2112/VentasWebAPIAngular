import { Component } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { Cliente } from '../models/cliente';
import { SharedModule } from '../shared/shared.module';
import { DialogClienteComponent } from './dialog/dialogcliente/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../common/delete/dialogdelete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  standalone: true, // 💥 fundamental
  imports: [ SharedModule ], // 💥 para usar *ngFor, pipes, etc.
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  public list: any[] = [];

  public displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  public cliente: Cliente = {
    id: 0,
    nombre: ''
  };

  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar  
  ){
    this.getClientes(); // 👈 lo llamás acá en el constructor o en ngOnInit
  }

  getClientes() {
    this.apiCliente.getClientes().subscribe((response: Response<Cliente[]>) => {
      console.log(response);
      this.list = response.datos;
    });
  }

  openDialogAddCliente() {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  openDialogEditCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: '250px',
      data: cliente // Pasar el cliente seleccionado al diálogo
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  deleteCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiCliente.deleteCliente(cliente.id).subscribe((response => {
          console.log(response);
          if (response.exito === true) {
            this.snackBar.open('Cliente eliminado', 'Cerrar', {
              duration: 2000,
            });
            this.getClientes();
          }
        }));
      }
    });
  }

  
}
