import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Recipe } from '../models';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-recipe-card',
  imports: [
    TimeCustomPipe, 
    MatCardModule, 
    MatIcon,
    MatTableModule,
    MatLabel
  ],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  recipe = input.required<Recipe | undefined>();
}
