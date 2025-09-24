/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCard } from './recipe-card';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatLabel } from '@angular/material/form-field';
import { MatFabButton } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { of } from 'rxjs';
import { TimeCustomPipe } from '../../shared/time-custom-pipe';

describe('RecipeCard', () => {
  let component: RecipeCard;
  let fixture: ComponentFixture<RecipeCard>;
  const recipeWS = {
    name: 'Zapiekanka',
    description: 'Polish Pizza on a Baguette',
    preparationTimeInMins: 20,
    ingredients: [
      { name: 'Pieczarki', quantity: '100g' },
      { name: 'Sos pomidorowy', quantity: '5 tbsp' },
      { name: 'Oliwki', quantity: '40g' },
    ],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecipeCard,
        MatCardModule,
        MatCardTitle,
        MatIcon,
        MatTableModule,
        MatLabel,
        MatFabButton,
        TimeCustomPipe,
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: { data: of({ recipe: recipeWS }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCard);
    component = fixture.componentInstance;
    component.recipe = signal(recipeWS);
    fixture.detectChanges();
  });

  it('should display the selected recipe name', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('mat-card-title'));
    expect(title.nativeElement.textContent).toContain(component.recipe()!.name);
  });
  it('should display the selected recipe time', () => {
    fixture.detectChanges();
    const time = fixture.debugElement.query(By.css('p.prep-time'));
    expect(time.nativeElement.textContent).toContain(
      component.recipe()!.preparationTimeInMins,
    );
  });
  it('should display the selected recipe ingredients', () => {
    fixture.detectChanges();
    const content = fixture.nativeElement.textContent;
    component.recipe()!.ingredients.forEach((ing) => {
      expect(content).toContain(ing.name);
      expect(content).toContain(ing.quantity);
    });
  });
  it('should display the selected recipe description', () => {
    fixture.detectChanges();
    const desc = fixture.debugElement.query(By.css('p.desc'));
    expect(desc.nativeElement.textContent).toContain(
      component.recipe()!.description,
    );
  });
});
