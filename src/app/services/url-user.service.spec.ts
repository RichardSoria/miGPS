import { TestBed } from '@angular/core/testing';

import { URLUSERService } from './url-user.service';

describe('URLUSERService', () => {
  let service: URLUSERService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(URLUSERService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
