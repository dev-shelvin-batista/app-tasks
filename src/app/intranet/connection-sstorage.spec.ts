import { TestBed } from '@angular/core/testing';

import { ConnectionSstorage } from './connection-sstorage';

describe('ConnectionSstorage', () => {
  let service: ConnectionSstorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionSstorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
