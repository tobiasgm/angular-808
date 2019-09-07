import {Injectable} from '@angular/core';
import {Gain} from '../model/web-audio/gain';
import {Buffer} from '../model/web-audio/buffer';
import {Oscillator} from '../model/web-audio/oscillator';
import {Compressor} from '../model/web-audio/compressor';
import {TrackService} from './track.service';
import {Track} from '../model/track';
import {SamplesService} from './samples.service';
import {BehaviorSubject} from 'rxjs';
import {StereoPanner} from '../model/web-audio/stereo-panner';

declare var WAAClock: any;

@Injectable({
  providedIn: 'root'
})
export class AudioengineService {

  audioContext: AudioContext;
  outputGain: Gain;
  compressor: Compressor;
  tickEvent: any;
  clock: any;
  BPM: number;
  totalSteps: number;
  playing: boolean;
  private currentStep = new BehaviorSubject<number>(0);
  currentStep$ = this.currentStep.asObservable();

  constructor(private trackService: TrackService,
              private samplesService: SamplesService) {
  }

  static removeTrack(track: Track): void {
    track.buffer.disconnect();
    track.buffer.destroy();
    track.buffer = null;
    track.inputgain.disconnect();
    track.inputgain = null;
    track.stereopanner.disconnect();
    track.stereopanner = null;
    track.audiobuffer = null;
  }

  initAudioEngine(BPM: number, totalSteps: number): void {
    this.playing = false;
    this.BPM = BPM;
    this.totalSteps = totalSteps;
    this.audioContext = new AudioContext();
    this.connectOutput();
    this.clock = new WAAClock(this.audioContext, {toleranceEarly: 0.1});
  }

  connectOutput(): void {
    this.outputGain = new Gain(this.audioContext, 1);
    this.compressor = new Compressor(
      this.audioContext, undefined, 30, 8, undefined, 0.1);
    this.compressor.connect(this.outputGain);
    this.outputGain.connect(this.audioContext.destination);
  }

  initTracks(): void {
    this.trackService.tracks$
      .subscribe(result => {
        result.forEach(track => {
          this.initTrack(track);
        });
      }, error => {
        console.error('Error! Could not get tracks: ' + error);
      }).unsubscribe();
  }

  initTrack(track: Track) {
    this.samplesService.getSample(track.filename)
      .subscribe(sample => {
        this.audioContext.decodeAudioData(sample)
          .then(audioBuffer => {
            track.audiobuffer = audioBuffer;
            if (track.buffer === null) {
              track.buffer = new Buffer(this.audioContext, 1);
            }
            if (track.inputgain === null) {
              track.inputgain = new Gain(this.audioContext);
            }
            if (track.stereopanner === null) {
              track.stereopanner = new StereoPanner(this.audioContext);
            }
          })
          .catch(e => console.error('Error decoding buffer: ' + e));
      }, error => {
        console.error('Error! Could not get samples: ' + error);
      });
  }

  play(): void {
    if (!this.playing) {
      this.audioContext.resume().then(() => {
        this.playing = true;
        this.clock.start();
        this.tickEvent = this.clock.callbackAtTime(this.handleTick.bind(this), this.audioContext.currentTime + 0.1)
          .repeat(1 / ((this.BPM / 60) * (this.totalSteps / 4)))
          .tolerance({late: 0.01});
      }, () => {
        console.error('Error! Could not resume audio.');
      });
    }
  }

  handleTick({deadline}: { deadline: number }) {
    if (this.currentStep.getValue() < this.totalSteps) {
      this.currentStep.next(this.currentStep.getValue() + 1);
    } else {
      this.currentStep.next(1);
    }
    this.stepTrigger(deadline);
  }

  stepTrigger(deadline: number) {
    this.trackService.tracks$
      .subscribe(result => {
        result.forEach(track => {
          if (track.pattern[this.currentStep.getValue() - 1] === 1) {
            this.playBuffer(deadline, track);
          }
        });
      }, error => {
        console.error('Error! Could not get tracks: ' + error);
      }).unsubscribe();
  }

  setTempo(newBPM: number) {
    if (this.playing) {
      const timeFactor = (this.BPM / 60) / (newBPM / 60);
      this.clock.timeStretch(this.audioContext.currentTime, [this.tickEvent], timeFactor);
      this.BPM = newBPM;
    } else {
      this.BPM = newBPM;
    }
  }

  setVolume(volume: number) {
    this.outputGain.gain.value = volume;
  }

  playMetronome(deadline: number, pitch: number, length: number) {
    const oscillator = new Oscillator('triangle', this.audioContext);
    oscillator.connect(this.compressor);
    oscillator.frequency.value = pitch;
    oscillator.start(deadline);
    oscillator.stop(deadline + length);
  }

  playBuffer(deadline: number, track: Track) {
    if (track.buffer) {
      track.buffer.connect(track.inputgain);
      track.inputgain.connect(track.stereopanner);
      track.stereopanner.connect(this.compressor);
      track.buffer.play(this.audioContext, deadline, track.audiobuffer);
    } else {
      this.initTrack(track);
    }
  }

  stop(): void {
    if (this.playing) {
      this.playing = false;
      this.clock.stop();
      if (typeof this.tickEvent !== 'undefined') {
        this.tickEvent.clear();
        this.tickEvent = null;
      }
      this.currentStep.next(0);
    }
  }

}
