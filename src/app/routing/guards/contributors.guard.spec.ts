import { TestBed, async, inject } from '@angular/core/testing';

import { ContributorsGuard } from './contributors.guard';

describe('ContributorsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContributorsGuard]
    });
  });

  it('should ...', inject([ContributorsGuard], (guard: ContributorsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
