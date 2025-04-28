import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogdelete',
  imports: [ MatDialogModule],
  templateUrl: './dialogdelete.component.html',
  styleUrl: './dialogdelete.component.scss'
})
export class DialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {}
}
