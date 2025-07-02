import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRecipe } from './one-recipe';

describe('OneRecipe', () => {
  let component: OneRecipe;
  let fixture: ComponentFixture<OneRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
