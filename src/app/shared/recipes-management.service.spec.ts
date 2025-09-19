import { TestBed } from '@angular/core/testing';

import { RecipesManagementService } from './recipes-management.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Observable, raceWith } from 'rxjs';
import { Recipe } from '../recipes/models';

describe('RecipesManagement', () => {
  let service: RecipesManagementService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  const recipeWS = {
    _id: 'qwerty',
    name: 'Zapiekanka',
    description: 'Polish Pizza on a Baguette',
    preparationTimeInMins: 20,
    ingredients: [
      { _id: '1ax', name: 'Pieczarki', quantity: '100g' },
      { _id: '2by', name: 'Sos pomidorowy', quantity: '5 tbsp' },
      { _id: '3cz', name: 'Oliwki', quantity: '40g' },
    ],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideStore({}),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(RecipesManagementService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return type should be an observable', () => {
    const newRecipeToAdd = {
      name: 'Guacamole',
      description: 'Creamy avocado dip',
      preparationTimeInMins: 15,
      ingredients: [
        { _id: '8ho', name: 'Awokado', quantity: '2 ripe' },
        { _id: '9ip', name: 'Cebula czerwona', quantity: '1 small' },
        { _id: '10jq', name: 'Sok z limonki', quantity: '2 tbsp' },
        { _id: '11kr', name: 'Kolendra', quantity: 'a few sprigs' },
      ],
    };
    expect(service.addRecipe(newRecipeToAdd)).toBeInstanceOf(
      Observable<Recipe>,
    );
    expect(service.loadRecipes()).toBeInstanceOf(Observable<Recipe[]>);
    expect(service.updateRecipe(newRecipeToAdd, 'qwerty')).toBeInstanceOf(
      Observable<Recipe>,
    );
    expect(service.fetchRecipe('qwerty')).toBeInstanceOf(Observable<Recipe>);
    expect(service.deleteRecipe(recipeWS)).toBeInstanceOf(Observable<null>);
  });

  it('should load all recipes', () => {
    const recipesToGet = [
      {
        name: 'Zapiekanka',
        description: 'Polish Pizza on a Baguette',
        preparationTimeInMins: 20,
        ingredients: [
          { _id: '1ax', name: 'Pieczarki', quantity: '100g' },
          { _id: '2by', name: 'Sos pomidorowy', quantity: '5 tbsp' },
          { _id: '3cz', name: 'Oliwki', quantity: '40g' },
        ],
      },
      {
        name: 'Caprese Salad',
        description: 'Classic Italian tomato and mozzarella salad',
        preparationTimeInMins: 10,
        ingredients: [
          { _id: '4dk', name: 'Pomidor', quantity: '2 medium' },
          { _id: '5el', name: 'Mozzarella', quantity: '150g' },
          { _id: '6fm', name: 'Bazylia', quantity: 'a handful' },
          { _id: '7gn', name: 'Oliwa z oliwek', quantity: '2 tbsp' },
        ],
      },
      {
        name: 'Guacamole',
        description: 'Creamy avocado dip',
        preparationTimeInMins: 15,
        ingredients: [
          { _id: '8ho', name: 'Awokado', quantity: '2 ripe' },
          { _id: '9ip', name: 'Cebula czerwona', quantity: '1 small' },
          { _id: '10jq', name: 'Sok z limonki', quantity: '2 tbsp' },
          { _id: '11kr', name: 'Kolendra', quantity: 'a few sprigs' },
        ],
      },
      {
        name: 'Shakshuka',
        description: 'Eggs poached in spicy tomato sauce',
        preparationTimeInMins: 25,
        ingredients: [
          { _id: '12ls', name: 'Pomidory krojone', quantity: '400g can' },
          { _id: '13mt', name: 'Papryka czerwona', quantity: '1 medium' },
          { _id: '14nu', name: 'Jajka', quantity: '4' },
          { _id: '15ov', name: 'Czosnek', quantity: '2 cloves' },
        ],
      },
    ];

    service.loadRecipes().subscribe({
      next: (recipes) => {
        expect(recipes)
          .withContext('should load all recipes')
          .toEqual(recipesToGet);
      },
      error: fail,
    });

    const req = httpController.expectOne(service['_resourceURL']);
    expect(req.request.method).toEqual('GET');
    req.flush(recipesToGet);
  });

  it('should fetch the given recipe', () => {
    service.fetchRecipe(recipeWS._id).subscribe({
      next: (rep) => {
        expect(rep)
          .withContext('should fetch the given recipe')
          .toEqual(recipeWS);
      },
      error: fail,
    });
    const req = httpController.expectOne(
      `${service['_resourceURL']}/${recipeWS._id}`,
    );
    expect(req.request.method).toEqual('GET');
    req.flush(recipeWS);
  });

  it('should edit the selected recipe', () => {
    const newRecipeToPut = {
      name: 'Guacamole',
      description: 'Creamy avocado dip',
      preparationTimeInMins: 15,
      ingredients: [
        { _id: '8ho', name: 'Awokado', quantity: '2 ripe' },
        { _id: '9ip', name: 'Cebula czerwona', quantity: '1 small' },
        { _id: '10jq', name: 'Sok z limonki', quantity: '2 tbsp' },
        { _id: '11kr', name: 'Kolendra', quantity: 'a few sprigs' },
      ],
    };
    service.updateRecipe(newRecipeToPut, recipeWS._id).subscribe({
      next: (rep) => {
        expect(rep)
          .withContext('should edit the selected recipe')
          .toEqual({ ...newRecipeToPut, _id: recipeWS._id });
      },
      error: fail,
    });
    const req = httpController.expectOne(
      `${service['_resourceURL']}/${recipeWS._id}`,
    );
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(newRecipeToPut);
    req.flush({ ...newRecipeToPut, _id: recipeWS._id });
  });

  it('should delete the selected recipe', () => {
    service.deleteRecipe(recipeWS).subscribe({
      next: (rep) => {
        expect(rep).withContext('should delete the selected recipe').toBeNull();
      },
    });
    const req = httpController.expectOne(
      `${service['_resourceURL']}/${recipeWS._id}`,
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });

  it('should add a recipe', () => {
    const newRecipeToAdd = {
      name: 'Guacamole',
      description: 'Creamy avocado dip',
      preparationTimeInMins: 15,
      ingredients: [
        { _id: '8ho', name: 'Awokado', quantity: '2 ripe' },
        { _id: '9ip', name: 'Cebula czerwona', quantity: '1 small' },
        { _id: '10jq', name: 'Sok z limonki', quantity: '2 tbsp' },
        { _id: '11kr', name: 'Kolendra', quantity: 'a few sprigs' },
      ],
    };
    service.addRecipe(newRecipeToAdd).subscribe({
      next: (rep) => {
        expect(rep)
          .withContext('should edit the selected recipe')
          .toEqual({ ...newRecipeToAdd });
      },
      error: fail,
    });
    const req = httpController.expectOne(`${service['_resourceURL']}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newRecipeToAdd);
    req.flush(newRecipeToAdd);
  });
});
