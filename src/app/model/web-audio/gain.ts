import {WebAudioNode} from './web-audio-node';

export class Gain extends WebAudioNode {

  gain: any;
  input: any;
  output: any;

  constructor(audioCtx) {
    super();
    this.gain = audioCtx.createGain();

    // set initial gain value
    this.gain.gain.value = 1;

    // set WebAudioModule requirements
    this.input = this.gain;
    this.output = this.gain;

    // make amplitude parameter available for connection
    this.gain = this.gain.gain;
  }

}
