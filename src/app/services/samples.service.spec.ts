import {TestBed} from '@angular/core/testing';

import {SamplesService} from './samples.service';
import {HttpClientModule} from '@angular/common/http';

describe('SamplesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: SamplesService = TestBed.get(SamplesService);
    expect(service).toBeTruthy();
  });
});
