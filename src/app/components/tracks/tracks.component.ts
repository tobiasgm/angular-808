import {Component, NgZone, OnInit} from '@angular/core';
import {Track} from '../../model/track';
import {TrackService} from '../../services/track.service';
import {Router} from '@angular/router';
import {AudioengineService} from '../../services/audioengine.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {

  selectedTrack: Track;
  tracks: Array<Track>;
  currentStep: number;
  subscription: Subscription;

  constructor(
    private trackService: TrackService,
    private audioengineService: AudioengineService,
    private zone: NgZone,
    private router: Router) {
  }

  ngOnInit() {
    this.getTracks();
    this.subscription = this.audioengineService.currentStep$
      .subscribe(result => {
        this.zone.run(() => { // <== execute the changes in this callback.
          this.currentStep = result;
        });
      }, error => {
        console.error('Error! Could not get current sequencer step: ' + error);
      });
  }

  onSelect(track: Track): void {
    this.selectedTrack = track;
  }

  onStepToggle(track: Track, step: number, i: number): void {
    this.trackService.toggleStep(track, step, i);
  }

  getTracks(): void {
    this.trackService.getTracks()
      .subscribe(result => {
        this.tracks = result;
      }, error => {
        console.error('Error! Could not get tracks: ' + error);
      });
  }

  remove(track: Track): void {
    this.trackService.removeTrack(track);
  }

  edit(track: Track): void {
    this.router.navigate(['track/', track.id]).then((e) => {
      if (!e) {
        console.log('Failed to navigate to track editor!');
      }
    });
  }

  setVolume(track: Track, volume: number): void {
    this.trackService.setVolume(track, volume);
  }

  setPan(track: Track, pan: number): void {
    this.trackService.setPan(track, pan);
  }
}
