/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({ selector: 'app-dummy', template: '', standalone: true })
class DummyComponent {}

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideZonelessChangeDetection(),
        provideStore({}),
        provideRouter([{ path: 'profile', component: DummyComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.inject(Location); // ensure Location is instantiated
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /profile on profile button click', async () => {
    const location = TestBed.inject(Location);
    const btn = fixture.debugElement.query(By.css('button.btn.dialog'));
    btn.nativeElement.click();
    await fixture.whenStable();
    expect(location.path()).toBe('/profile');
  });
});
