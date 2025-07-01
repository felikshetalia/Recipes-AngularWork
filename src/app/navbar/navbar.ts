import { Component, inject } from '@angular/core';
import { AuthorDialog } from '../shared/author-dialog/author-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  imports: [MatDialogModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  readonly dialog = inject(MatDialog);
  openDialog() {
    this.dialog.open(AuthorDialog, {
      hasBackdrop: true,
      disableClose: false,
      data: { name: 'Kuchnia Express Marche Przepisy' }
    });
  }
}
