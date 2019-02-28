import { TestBed, async, inject } from '@angular/core/testing';

import { LoadStoreGuard } from './load-store.guard';

describe('LoadStoreGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadStoreGuard]
    });
  });

  it('should ...', inject([LoadStoreGuard], (guard: LoadStoreGuard) => {
    expect(guard).toBeTruthy();
  }));
});
