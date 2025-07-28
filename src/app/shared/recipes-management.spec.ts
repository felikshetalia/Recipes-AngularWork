import { TestBed } from '@angular/core/testing';

import { RecipesManagementService } from './recipes-management';

describe('RecipesManagement', () => {
  let service: RecipesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
