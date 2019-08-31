import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../services/track.service';
import {Track} from '../../model/track';
import { Location } from '@angular/common';

@Component({
  selector: 'app-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.scss']
})
export class TrackEditComponent implements OnInit {

  track: Track;

  constructor(  private route: ActivatedRoute,
                private trackService: TrackService,
                private location: Location) { }

  ngOnInit(): void {
    this.getTrack();
  }

  getTrack(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.trackService.getTrack(id)
      .subscribe(track => this.track = track);
  }

  goBack(): void {
    this.location.back();
  }

}
