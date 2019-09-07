import {Component, NgZone, OnInit} from '@angular/core';
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
export class TrackEditComponent implements OnInit {

  track: Track;
  samples: string[];
  trackEditForm: FormGroup;
  currentStep: number;
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
      .subscribe(result => {
        this.zone.run(() => { // <== execute the changes in this callback.
          this.currentStep = result;
        });
      }, error => {
        console.error('Error! Could not get current sequencer step: ' + error);
      });
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
        console.error('Error! Could not get track: ' + error);
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
