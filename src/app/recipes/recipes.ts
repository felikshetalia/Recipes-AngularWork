import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Recipe } from './models';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, MatIcon, MatCardModule, MatIconButton, RouterLink],
  styleUrl: './recipes.scss',
})
export class Recipes {
  private _route = inject(Router);

  mobileMode = input<boolean>();
  sidenav = input.required<MatSidenav>();
  recipeList = input<Recipe[]>();
  isLoading = input<boolean>();
  isError = input<any | null>();

  selectedRecipe = output<Recipe>();
  deleteRecipeClicked = output<Recipe>();
  editClicked = output<Recipe>();

  onSelectRecipe(rep: Recipe): void {
    this.selectedRecipe.emit(rep);
    if (this.mobileMode()) {
      this.sidenav().close();
    }
  }

  onDeleteRecipe(rep: Recipe): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.deleteRecipeClicked.emit(rep);
    }
  }

  onEditRecipe(rep: Recipe, event: MouseEvent): void {
    event.stopPropagation();
    if (this.mobileMode()) {
      this.sidenav().close();
    }
    this.editClicked.emit(rep);
    // this._route.navigate(['/recipes', rep._id, '/edit']);
  }
}
