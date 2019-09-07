import {Injectable} from '@angular/core';
import {Track} from '../model/track';
import {Observable, of} from 'rxjs';
import {DEFAULTTRACKS, NEWTRACK} from '../model/default-tracks';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  TRACKS = DEFAULTTRACKS;
  index = DEFAULTTRACKS.length + 1;

  constructor() {
  }

  getTracks(): Observable<Track[]> {
    return of(this.TRACKS);
  }

  getTrack(id: number): Observable<Track> {
    return of(this.TRACKS.find(track => track.id === id));
  }

  addTrack(): void {
    const newtrack = JSON.parse(JSON.stringify(NEWTRACK));
    newtrack.id = this.index;
    this.TRACKS.push(newtrack);
    this.index++;
  }

  removeTrack(track: Track): void {
    const index = this.TRACKS.indexOf(track);
    this.TRACKS.splice(index, 1);
  }

  toggleStep(track: Track, step: number, i: number): void {
    const newValue = step > 0 ? 0 : 1;
    const index = this.TRACKS.indexOf(track);
    this.TRACKS[index].pattern[i] = newValue;
  }

  setVolume(track: Track, volume: number): void {
    const index = this.TRACKS.indexOf(track);
    this.TRACKS[index].inputgain.gain.value = volume;
  }

  setPan(track: Track, pan: number): void {
    const index = this.TRACKS.indexOf(track);
    this.TRACKS[index].stereopanner.pan.value = pan;
  }

}
