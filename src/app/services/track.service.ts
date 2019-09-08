import {Injectable} from '@angular/core';
import {Track} from '../model/track';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {DEFAULTTRACKS, NEWTRACK} from '../model/default-tracks';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  index = DEFAULTTRACKS.length + 1;
  private tracks = new BehaviorSubject<Track[]>(DEFAULTTRACKS);
  tracks$ = this.tracks.asObservable();

  constructor() {
  }

  setTracks(tracks: Track[]): void {
    this.tracks.next(tracks);
  }

  getTrack(id: number): Observable<Track> {
    return of(this.tracks.value.find(track => track.id === id));
  }

  addTrack(): void {
    const newtrack = JSON.parse(JSON.stringify(NEWTRACK));
    newtrack.id = this.index;
    this.tracks.value.push(newtrack);
    this.index++;
  }

  removeTrack(track: Track): void {
    const index = this.tracks.value.indexOf(track);
    this.tracks.value.splice(index, 1);
  }

  toggleStep(track: Track, value: number, i: number): void {
    const newValue = value > 0 ? 0 : 1;
    const index = this.tracks.value.indexOf(track);
    this.tracks.value[index].pattern[i] = newValue;
  }

  setVolume(track: Track, volume: number): void {
    const index = this.tracks.value.indexOf(track);
    this.tracks.value[index].inputgain.gain.value = volume;
    this.tracks.value[index].inputgainValue = volume;
  }

  setPan(track: Track, pan: number): void {
    const index = this.tracks.value.indexOf(track);
    this.tracks.value[index].stereopanner.pan.value = pan;
    this.tracks.value[index].stereopannerValue = pan;
  }

  setReverbSend(track: Track, reverbSend: number): void {
    const index = this.tracks.value.indexOf(track);
    this.tracks.value[index].convolver.setGain(reverbSend);
    this.tracks.value[index].convolverValue = reverbSend;
  }

}
