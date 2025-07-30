import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-author-dialog',
  imports: [
    MatDialogModule,
    MatButton
  ],
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
