import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recipes } from './recipes';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';

describe('Recipes', () => {
  let component: Recipes;
  let fixture: ComponentFixture<Recipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recipes],
      providers: [provideZonelessChangeDetection(), provideStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(Recipes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
