import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe } from '../models';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-card',
  imports: [TimeCustomPipe, MatCardModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  recipe = input.required<Recipe | undefined>();
}
