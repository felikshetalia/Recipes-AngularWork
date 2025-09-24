/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { RecipeForm } from './recipe-form';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { By } from '@angular/platform-browser';
import { FormArray, Validators } from '@angular/forms';

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

  it('should update recipe name', () => {
    component.form.controls.recipeName.setValue('Zapiekanka');
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('input[formControlName="recipeName"]'),
    ).nativeElement;
    expect(input.value).toBe('Zapiekanka');
  });

  it('should update recipe preparation time', () => {
    component.form.controls.prepTime.setValue(90);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('input[formControlName="prepTime"]'),
    ).nativeElement;
    expect(+input.value).toBe(90);
  });

  it('should update recipe description', () => {
    const mockDesc =
      'Some description added here in order to fulfill the testing task';
    component.form.controls.description.setValue(mockDesc);
    fixture.detectChanges();
    const input = fixture.debugElement.query(
      By.css('textarea[formControlName="description"]'),
    ).nativeElement;
    expect(input.value).toBe(mockDesc);
  });

  it('should update recipe ingredients', () => {
    const ingredientsForm = component.form.get('ingredients') as FormArray;
    ingredientsForm.push(
      component['_fb'].group({ name: ['Awokado'], quantity: ['1'] }),
    );
    const inputName = fixture.debugElement.queryAll(By.css('.input-name'));
    const inputQuantity = fixture.debugElement.queryAll(
      By.css('.input-quantity'),
    );

    inputName.forEach((name, i) => {
      expect(name.nativeElement.value).toBe(
        ingredientsForm.controls[i].get('name')?.value,
      );
    });
    inputQuantity.forEach((q, i) => {
      expect(q.nativeElement.value).toBe(
        ingredientsForm.controls[i].get('quantity')?.value,
      );
    });
  });
});
