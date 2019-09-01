import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  url: string;
  samples = [
    'Clap.wav',
    'Clava.wav',
    'CongasHi.wav',
    'CongasLow.wav',
    'CongasMid.wav',
    'HiHatOpen.wav',
    'HiHatClosed.wav',
    'Kick.wav',
    'Rimshot.wav',
    'Snare.wav'];

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
