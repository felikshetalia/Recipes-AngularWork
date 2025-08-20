import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatLabel } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeForm } from '../recipe-form/recipe-form';
import { selectedRecipe } from '../../store/recipes.selectors';
import { MatButton, MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-recipe-card',
  imports: [
    TimeCustomPipe,
    MatCardModule,
    MatIcon,
    MatTableModule,
    MatLabel,
    RecipeForm,
    MatIcon,
    MatFabButton,
    RouterLink,
  ],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  private _router = inject(Router);
  private _store = inject(Store);

  formMode = signal<string | null>(null);
  goToForm = signal<boolean>(false);

  recipe = this._store.selectSignal(selectedRecipe);

  onCancel() {
    this._router.navigate(['./']);
  }
}
