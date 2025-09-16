import { inject, provideZonelessChangeDetection } from '@angular/core';
import { TimeCustomPipe } from './time-custom-pipe';
import { TestBed } from '@angular/core/testing';

describe('TimeCustomPipe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeCustomPipe],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });
  it('create an instance', () => {
    const pipe = new TimeCustomPipe();
    expect(pipe).toBeTruthy();
  });
  it('should transform the given number into hours and minutes', () => {
    const pipe = new TimeCustomPipe();
    expect(pipe.transform(100)).toBe('1h 40m');
    expect(pipe.transform(50)).toBe('0h 50m');
    expect(pipe.transform(120)).toBe('2h 0m');
  });
});
