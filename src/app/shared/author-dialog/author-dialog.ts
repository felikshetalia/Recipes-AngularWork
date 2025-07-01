import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-author-dialog',
  imports: [MatDialogModule],
  standalone: true,
  templateUrl: './author-dialog.html',
  styleUrl: './author-dialog.scss'
})
export class AuthorDialog {
  closeDialog(): void {
    const dialog = inject(MatDialog);
    return dialog.closeAll();
  }
}
