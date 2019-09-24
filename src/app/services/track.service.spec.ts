import {TrackService} from './track.service';
import {async, inject} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {DEFAULTTRACKS, NEWTRACK} from '../model/default-tracks';
import {of} from 'rxjs';

describe('TrackService', () => {
  let trackService: TrackService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackService
      ],
    });

    trackService = TestBed.get(TrackService);

  }));


  it('should be created', () => {
    expect(trackService).toBeTruthy();
  });

  it('should set tracks', () => {
    trackService.setTracks([NEWTRACK]);
    trackService.tracks$.subscribe((tracks) => {
      expect(tracks).toEqual([NEWTRACK]);
    });
  });

  it('should get track by id', () => {
    spyOn(trackService, 'getTrack').and.returnValue(of(DEFAULTTRACKS[0]));
    trackService.getTrack(0).subscribe((track) => {
      expect(track).toEqual(DEFAULTTRACKS[0]);
    });
  });

  it('should add track', () => {
    const lengthExpected = DEFAULTTRACKS.length + 1;
    spyOn(trackService, 'addTrack').and.callThrough();
    trackService.addTrack();
    trackService.tracks$.subscribe((tracks) => {
      expect(tracks.length).toEqual(lengthExpected);
    });
  });

  it('should remove track', () => {
    const lengthExpected = DEFAULTTRACKS.length - 1;
    const trackRemoved = DEFAULTTRACKS[1];
    spyOn(trackService, 'removeTrack').and.callThrough();
    trackService.removeTrack(DEFAULTTRACKS[0]);
    trackService.tracks$.subscribe((tracks) => {
      expect(tracks.length).toEqual(lengthExpected);
      expect(tracks[0]).toEqual(trackRemoved);
    });
  });

});
