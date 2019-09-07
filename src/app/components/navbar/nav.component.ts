import { Component, OnInit } from '@angular/core';
import {TrackService} from '../../services/track.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private trackService: TrackService) { }

  ngOnInit() {
  }

  addTrack(): void {
    this.trackService.addTrack();
  }

}
