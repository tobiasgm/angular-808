import {WebAudioNode} from './web-audio-node';

export class StereoPanner extends WebAudioNode {

  stereopanner: StereoPannerNode;
  input: AudioNode;
  pan: AudioParam;

  constructor(audioCtx: AudioContext, pan: number = 0.0) {
    super();
    this.stereopanner = audioCtx.createStereoPanner();

    // set initial pan value
    this.stereopanner.pan.value = pan;
    // set WebAudioModule requirements
    this.input = this.stereopanner;
    this.output = this.stereopanner;

    // make pan parameter available for connection
    this.pan = this.stereopanner.pan;
  }

}
