import { TestBed } from '@angular/core/testing';

import { AudioengineService } from './audioengine.service';

describe('AudioengineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioengineService = TestBed.get(AudioengineService);
    expect(service).toBeTruthy();
  });
});
