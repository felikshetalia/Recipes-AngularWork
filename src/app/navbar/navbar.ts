import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [MatFabButton, MatIcon],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private _router = inject(Router);
  goToProfile(): void {
    this._router.navigateByUrl('/profile');
  }
  goHome(): void {
    this._router.navigateByUrl('/');
  }
}
