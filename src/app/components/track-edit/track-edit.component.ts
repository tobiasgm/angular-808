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
      .subscribe(currentStep => {
        this.zone.run(() => { // <== execute the changes in this callback.
          this.currentStep = currentStep;
        });
      });
  }

  getTrack(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trackService.getTrack(id)
      .subscribe(track => {
        this.track = track;
        this.trackEditForm = this.formbuilder.group({
          sampleSelect: this.track.filename,
        });
      });
  }

  getSamples(): void {
    this.samplesService.getSamples()
      .subscribe(
        samples => {
          this.samples = samples;
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

}
