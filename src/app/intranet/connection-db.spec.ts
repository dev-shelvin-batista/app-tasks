import { TestBed } from '@angular/core/testing';

import { ConnectionDb } from './connection-db';

describe('ConnectionDb', () => {
  let service: ConnectionDb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionDb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
