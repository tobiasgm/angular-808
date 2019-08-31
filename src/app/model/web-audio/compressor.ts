import {WebAudioNode} from './web-audio-node';

export class Compressor extends WebAudioNode {

  compressor: any;
  input: any;
  output: any;

  constructor(audioCtx) {
    super();
    this.compressor = audioCtx.createDynamicsCompressor();
    this.compressor.threshold.value = -12.0;
    this.compressor.knee.value = 30.0; // default 30
    this.compressor.ratio.value = 5.0;
    this.compressor.attack.value = 0.03; // 30ms
    this.compressor.release.value = 0.1; // 100ms

    this.input = this.compressor;
    this.output = this.compressor;

  }
}
