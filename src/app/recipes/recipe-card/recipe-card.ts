import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe } from '../models';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';
import { RecipeForm } from "../recipe-form/recipe-form";

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
