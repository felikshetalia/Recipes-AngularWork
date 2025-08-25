import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatLabel } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButton, MatFabButton } from '@angular/material/button';
import { map, Observable } from 'rxjs';
import { Recipe } from '../models';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-card',
  imports: [
    TimeCustomPipe,
    MatCardModule,
    MatIcon,
    MatTableModule,
    MatLabel,
    MatFabButton,
    RouterLink,
  ],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  private _route = inject(ActivatedRoute);
  recipe = toSignal<Recipe | undefined>(
    this._route.data.pipe(map((data) => data['recipe'])),
  );
}
