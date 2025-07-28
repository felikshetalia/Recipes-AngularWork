import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Recipe } from '../models';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';
import { MatCardModule } from '@angular/material/card';
import { f } from "../../../../node_modules/@angular/material/icon-module.d-COXCrhrh";
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-recipe-card',
  imports: [
    TimeCustomPipe, 
    MatCardModule, 
    MatIcon,
    MatTableModule
  ],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  recipe = input.required<Recipe | undefined>();
}
