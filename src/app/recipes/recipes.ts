import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Recipe } from './models';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatListModule, MatIcon, MatCardModule, MatIconButton, RouterLink],
  styleUrl: './recipes.scss',
})
export class Recipes {
  private _route = inject(Router);
  private _activeRoute = inject(ActivatedRoute);

  mobileMode = input<boolean>();

  recipeList = input<Recipe[]>();
  isLoading = input<boolean>();
  isError = input<any | null>();

  selectedRecipe = output<Recipe>();
  deleteRecipeClicked = output<Recipe>();

  constructor() {
    const media = inject(MediaMatcher);
  }

  onSelectRecipe(rep: Recipe): void {
    this.selectedRecipe.emit(rep);
  }

  onDeleteRecipe(rep: Recipe): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.deleteRecipeClicked.emit(rep);
    }
  }

  onEditRecipe(rep: Recipe): void {
    this._route.navigate(['/recipes', rep._id, '/edit']);
  }
}
