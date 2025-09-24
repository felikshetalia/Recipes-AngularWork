/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDialog } from './author-dialog';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AuthorDialog', () => {
  let component: AuthorDialog;
  let fixture: ComponentFixture<AuthorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorDialog],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
