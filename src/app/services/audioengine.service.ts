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

  clock: any;
  audioContext: AudioContext;
  outputGain: Gain;
  compressor: Compressor;
  tickEvent: any;
  BPM: number;
  totalSteps: number;
  tracks: Array<Track>;
  playing: boolean;
  private currentStep = new BehaviorSubject<number>(0);
  currentStep$ = this.currentStep.asObservable();

  constructor(private trackService: TrackService,
              private samplesService: SamplesService) {
  }

  initAudioEngine(BPM: number, totalSteps: number): void {
    this.playing = false;
    this.BPM = BPM;
    this.totalSteps = totalSteps;
    this.audioContext = new AudioContext();
    this.outputGain = new Gain(this.audioContext);
    this.outputGain.gain.value = 1;
    this.compressor = new Compressor(this.audioContext);
    this.compressor.connect(this.outputGain);
    this.outputGain.connect(this.audioContext.destination);
    this.clock = new WAAClock(this.audioContext, {toleranceEarly: 0.1});
  }

  initTracks(): void {
    this.trackService.getTracks()
      .subscribe(tracks => {
        this.tracks = tracks;
        this.loadBuffers();
      });
  }

  loadBuffers(): void {
    this.tracks.forEach(track => {
      this.samplesService.getSample(track.filename)
        .subscribe((data: any) => {
          this.audioContext.decodeAudioData(data)
            .then(audioBuffer => {
              track.audiobuffer = audioBuffer;
              if (track.buffer === null) { track.buffer = new Buffer(this.audioContext); }
              if (track.inputgain === null) {track.inputgain = new Gain(this.audioContext); }
              if (track.stereopanner === null) {track.stereopanner = new StereoPanner(this.audioContext); }
            })
            .catch(e => console.log('Error decoding buffer: ' + e));
        });
    });
  }

  play(): void {
    if (!this.playing) {
      console.log('BPM' + this.BPM);
      this.audioContext.resume().then(() => {
        this.playing = true;
        this.clock.start();
        this.tickEvent = this.clock.callbackAtTime(this.handleTick.bind(this), this.audioContext.currentTime + 0.1)
          .repeat(1 / ((this.BPM / 60) * (this.totalSteps / 4)))
          .tolerance({late: 0.01});
      });
    }
  }

  handleTick({deadline}) {
    if (this.currentStep.getValue() < this.totalSteps) {
      this.currentStep.next(this.currentStep.getValue() + 1);
    } else {
      this.currentStep.next(1);
    }
    this.stepTrigger(deadline);
  }

  stepTrigger(deadline) {
    this.tracks.forEach(track => {
      if (track.pattern[this.currentStep.getValue() - 1] === 1) {
        this.playBuffer(deadline, track);
      }
    });
    // this.playMetronome(deadline, 4440);
  }

  setTempo(newBPM) {
    if (this.playing) {
      this.clock.timeStretch(this.audioContext.currentTime, [this.tickEvent], (this.BPM / 60) / (newBPM / 60));
      this.BPM = newBPM;
    } else {
      this.BPM = newBPM;
    }
  }

  setVolume(volume) {
    this.outputGain.gain.value = volume;
  }

  playMetronome(deadline, pitch) {
    const oscillator = new Oscillator('triangle', this.audioContext);
    oscillator.connect(this.compressor);
    oscillator.frequency.value = pitch;
    oscillator.start(deadline);
    oscillator.stop(deadline + 0.0001);
  }

  playBuffer(deadline, track) {
    track.buffer.connect(track.inputgain);
    track.inputgain.connect(track.stereopanner);
    track.stereopanner.connect(this.compressor);
    track.buffer.play(this.audioContext, deadline, track.audiobuffer);
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
