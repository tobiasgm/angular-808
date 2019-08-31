import { Component, OnInit } from '@angular/core';
import {TrackService} from '../../services/track.service';
import {AudioengineService} from '../../services/audioengine.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private trackService: TrackService, private audioengineService: AudioengineService) { }

  ngOnInit() {
  }

  addTrack(): void {
    this.trackService.addTrack();
    this.audioengineService.initTracks();
  }

}
