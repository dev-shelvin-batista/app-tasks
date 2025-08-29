import { TestBed } from '@angular/core/testing';

import { Alerts } from './alerts';

describe('Alerts', () => {
  let service: Alerts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Alerts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
