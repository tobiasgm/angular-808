import {Injectable} from '@angular/core';
import {TrackService} from './track.service';
import {Track} from '../model/track';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private trackService: TrackService) {
  }

  static replacer(name: string, value: any) {
    if (name === 'stereopanner' || name === 'inputgain' ||
      name === 'buffer' || name === 'audiobuffer') {
      return null;
    } else {
      return value;
    }
  }

  downloadTracks(): void {
    this.trackService.tracks$
      .subscribe(result => {
        const blob = new Blob(
          [JSON.stringify(result, FilesService.replacer, 2)],
          {type: 'application/octet-stream'});
        const anchorElement = document.createElement('a');
        anchorElement.download = 'groove.json';
        anchorElement.href = window.URL.createObjectURL(blob);
        document.body.appendChild(anchorElement);
        anchorElement.click();
        window.URL.revokeObjectURL(anchorElement.href);
        anchorElement.remove();
      }, error => {
        console.error('Error! Could not download tracks: ' + error);
      }).unsubscribe();
  }

  loadTracksFromFile(files: FileList): Observable<Track[]> {
    return new Observable((observable) => {
      const fileReader = new FileReader();
      fileReader.onload = (() => {
        observable.next(JSON.parse(fileReader.result as string));
        observable.complete();
      });
      fileReader.readAsText(files[0]);
    });
  }

}
