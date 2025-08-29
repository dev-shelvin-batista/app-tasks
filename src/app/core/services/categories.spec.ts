import { TestBed } from '@angular/core/testing';

import { Categories } from './categories';

describe('Categories', () => {
  let service: Categories;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Categories);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
