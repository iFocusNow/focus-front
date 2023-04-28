import { TestBed } from '@angular/core/testing';

import { BlockPeriodsService } from './block-periods.service';

describe('BlockPeriodsService', () => {
  let service: BlockPeriodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockPeriodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
