import { TestBed, async, inject } from '@angular/core/testing';

import { ContributorGuard } from './contributor.guard';

describe('ContributorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContributorGuard]
    });
  });

  it('should ...', inject([ContributorGuard], (guard: ContributorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
