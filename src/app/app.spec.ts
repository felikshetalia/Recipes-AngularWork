import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideStore } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MediaMatcher } from '@angular/cdk/layout';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
        {
          provide: MediaMatcher,
          useValue: {
            matchMedia: () => ({
              matches: false,
              addListener: () => {},
              removeListener: () => {},
            }),
          },
        },
        provideMockStore({
          initialState: {
            recipesList: {
              recipes: [
                {
                  id: 1,
                  name: 'Pasta',
                  description: 'Tasty pasta',
                  preparationTimeInMins: 20,
                  ingredients: [
                    { name: 'Bolognese', quantity: '100g' },
                    { name: 'Noodles', quantity: '1/2 pack' },
                  ],
                },
                {
                  id: 2,
                  name: 'Pizza',
                  description: 'Cheesy pizza',
                  preparationTimeInMins: 15,
                  ingredients: [
                    { name: 'Tomato sauce', quantity: '100g' },
                    { name: 'Pieczarki', quantity: '40g' },
                  ],
                },
              ],
              isLoading: false,
              error: null,
              selectedRecipe: undefined,
            },
          },
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
