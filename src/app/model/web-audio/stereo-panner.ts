import {WebAudioNode} from './web-audio-node';

export class StereoPanner extends WebAudioNode {

  stereopanner: StereoPannerNode;
  input: any;
  pan: any;

  constructor(audioCtx) {
    super();
    this.stereopanner = audioCtx.createStereoPanner();

    // set initial pan value
    this.stereopanner.pan.value = 0.0;
    // set WebAudioModule requirements
    this.input = this.stereopanner;
    this.output = this.stereopanner;

    // make pan parameter available for connection
    this.pan = this.stereopanner.pan;
  }

}
