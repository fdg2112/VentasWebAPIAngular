import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiclienteService } from '../../../services/apicliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-dialogcliente',
  imports: [
    SharedModule
  ],
  templateUrl: './dialogcliente.component.html',
  styleUrl: './dialogcliente.component.scss'
})

export class DialogClienteComponent {

  public nombre!: string;

  constructor(
              public dialogRef: MatDialogRef<DialogClienteComponent>,
              public apiCliente: ApiclienteService,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public cliente: Cliente
              ){
                if (this.cliente !== null) {
                  this.nombre = cliente.nombre;
                }
              }

  closeDialog() {
    this.dialogRef.close();
  }

  addCliente(){
    const cliente = {
      id: 0,
      nombre: this.nombre,
    };

    this.apiCliente.createCliente(cliente).subscribe(
      response => {
        if (response.exito) {
          console.log('Cliente agregado:', response.datos);
          this.snackBar.open('Cliente agregado con éxito', 'Cerrar', {
            duration: 2000,
          });
        }
        this.closeDialog();
      },
      error => {
        console.error('Error al agregar cliente:', error);
        this.snackBar.open('Error al agregar cliente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

  editCliente() {
    
    const cliente = {
      id: this.cliente.id,
      nombre: this.nombre,
    };

    this.apiCliente.updateCliente(cliente).subscribe(
      response => {
        if (response.exito) {
          console.log('Cliente editado:', response.datos);
          this.snackBar.open('Cliente editado con éxito', 'Cerrar', {
            duration: 2000,
          });
        }
        this.closeDialog();
      },
      error => {
        console.error('Error al editar cliente:', error);
        this.snackBar.open('Error al editar cliente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }
}
