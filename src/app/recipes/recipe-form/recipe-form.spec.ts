import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  WritableSignal,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { RecipeForm } from './recipe-form';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('RecipeForm', () => {
  let component: RecipeForm;
  let fixture: ComponentFixture<RecipeForm>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeForm],
      providers: [
        provideStore({}),
        provideZonelessChangeDetection(),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
