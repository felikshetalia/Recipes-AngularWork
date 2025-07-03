import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe, recipesList } from '../recipes-list';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';

@Component({
  selector: 'app-recipe-card',
  imports: [TimeCustomPipe],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  recipe = input.required<Recipe | undefined>();
}
