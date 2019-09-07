import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../services/track.service';
import {Track} from '../../model/track';
import {Location} from '@angular/common';
import {SamplesService} from '../../services/samples.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AudioengineService} from '../../services/audioengine.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.scss']
})
export class TrackEditComponent implements OnInit, OnDestroy {

  track: Track;
  samples: string[];
  trackEditForm: FormGroup;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private trackService: TrackService,
              private audioengineService: AudioengineService,
              private samplesService: SamplesService,
              private formbuilder: FormBuilder,
              private zone: NgZone,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getTrack();
    this.getSamples();
    this.subscription = this.audioengineService.currentStep$
      .subscribe(() => {
        this.zone.run(() => {});
      }, error => {
        console.error('Error! Could not get current sequencer step: ' + error);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTrack(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trackService.getTrack(id)
      .subscribe(result => {
        this.track = result;
        this.trackEditForm = this.formbuilder.group({
          sampleSelect: this.track.filename,
        });
      }, error => {
        console.error('Error! Could not get track to edit: ' + error);
      });
  }

  getSamples(): void {
    this.samplesService.getSamples()
      .subscribe(result => {
        this.samples = result;
      }, error => {
        console.error('Error! Could not get samples: ' + error);
      });
  }

  setSample(): void {
    this.track.filename = this.trackEditForm.get('sampleSelect').value;
    this.audioengineService.initTracks();
  }

  goBack(): void {
    this.location.back();
  }

  onStepToggle(track: Track, step: number, i: number): void {
    this.trackService.toggleStep(track, step, i);
  }

  setVolume(track: Track, volume: number): void {
    this.trackService.setVolume(track, volume);
  }

  setPan(track: Track, pan: number): void {
    this.trackService.setPan(track, pan);
  }

}
