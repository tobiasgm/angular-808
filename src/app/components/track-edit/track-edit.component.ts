import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../services/track.service';
import {Track} from '../../model/track';
import { Location } from '@angular/common';
import {SamplesService} from '../../services/samples.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AudioengineService} from '../../services/audioengine.service';

@Component({
  selector: 'app-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.scss']
})
export class TrackEditComponent implements OnInit {

  track: Track;
  samples: string[];
  trackEditForm: FormGroup;


  constructor(  private route: ActivatedRoute,
                private trackService: TrackService,
                private audioengineService: AudioengineService,
                private samplesService: SamplesService,
                private formbuilder: FormBuilder,
                private location: Location) { }

  ngOnInit(): void {
    this.getTrack();
    this.samples = this.samplesService.samples;
    this.trackEditForm = this.formbuilder.group({
      sampleSelect: this.track.filename,
    });
  }

  getTrack(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trackService.getTrack(id)
      .subscribe(track => this.track = track);
  }

  setSample(): void {
    this.track.filename = this.trackEditForm.get('sampleSelect').value;
    this.audioengineService.initTracks();
  }

  goBack(): void {
    this.location.back();
  }

}
