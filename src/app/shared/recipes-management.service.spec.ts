import { TestBed } from '@angular/core/testing';

import { RecipesManagementService } from './recipes-management.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';

describe('RecipesManagement', () => {
  let service: RecipesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideStore({}),
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(RecipesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
