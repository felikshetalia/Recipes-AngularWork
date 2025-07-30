import { Component, inject } from '@angular/core';
import { AuthorDialog } from '../shared/author-dialog/author-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    MatDialogModule,
    MatFabButton,
    MatIcon
  ],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  readonly dialog = inject(MatDialog);
  
  openDialog():void {
    this.dialog.open(AuthorDialog, {
      hasBackdrop: true,
      disableClose: false,
      data: { name: 'Kuchnia Express Marche Przepisy' }
    });
  }
}
