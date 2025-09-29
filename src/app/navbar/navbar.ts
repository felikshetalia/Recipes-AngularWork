import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatFabButton, MatIcon],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private _router = inject(Router);

  goHome(): void {
    this._router.navigateByUrl('/');
  }
}
