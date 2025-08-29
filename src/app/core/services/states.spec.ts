import { TestBed } from '@angular/core/testing';

import { States } from './states';

describe('States', () => {
  let service: States;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(States);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
