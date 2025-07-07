import { TestBed } from '@angular/core/testing';

import { RecipesManagement } from './recipes-management';

describe('RecipesManagement', () => {
  let service: RecipesManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
