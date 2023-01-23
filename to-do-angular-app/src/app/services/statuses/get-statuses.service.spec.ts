import { TestBed } from '@angular/core/testing';

import { GetStatusesService } from './get-statuses.service';

describe('GetStatusesService', () => {
  let service: GetStatusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStatusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
