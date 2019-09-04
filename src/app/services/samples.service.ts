import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  url: string;
  samples = [
    'Clap.mp3',
    'Clava.mp3',
    'Congas_Hi.mp3',
    'Congas_Low.mp3',
    'Congas_Mid.mp3',
    'Cowbell.mp3',
    'Cymbal.mp3',
    'HiHat_Open.mp3',
    'HiHat_Closed.mp3',
    'Kick.mp3',
    'Maraca.mp3',
    'Rimshot.mp3',
    'Snare.mp3'];

  constructor(private http: HttpClient) {
    this.url = 'assets/sounds/';
  }

  getSample(filename: string): Observable<ArrayBuffer> {
    return this.http.get(this.url + filename, {responseType: 'arraybuffer'});
  }

  getSamples(): Observable<string[]> {
    return of(this.samples);
  }

}
