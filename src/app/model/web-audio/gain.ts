import {WebAudioNode} from './web-audio-node';

export class Gain extends WebAudioNode {

  gainNode: GainNode;
  gain: AudioParam;
  input: AudioNode;
  output: AudioNode;

  constructor(audioCtx: AudioContext, gain: number = 1) {
    super();
    this.gainNode = audioCtx.createGain();

    // set initial gain value
    this.gainNode.gain.value = gain;

    // set WebAudioModule requirements
    this.input = this.gainNode;
    this.output = this.gainNode;

    // make amplitude parameter available for connection
    this.gain = this.gainNode.gain;
  }

}
