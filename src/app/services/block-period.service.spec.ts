import { TestBed } from '@angular/core/testing';

import { BlockPeriodService } from './block-period.service';

describe('BlockPeriodService', () => {
  let service: BlockPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
