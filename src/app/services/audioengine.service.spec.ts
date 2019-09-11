import {TestBed} from '@angular/core/testing';

import {AudioengineService} from './audioengine.service';
import {HttpClientModule} from '@angular/common/http';

describe('AudioengineService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    }
  ));

  it('should be created', () => {
    const service: AudioengineService = TestBed.get(AudioengineService);
    expect(service).toBeTruthy();
  });
});
