import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
// Agregá los módulos que vayas usando...

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule
  ]
})

export class SharedModule {}
