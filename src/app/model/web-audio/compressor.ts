import {WebAudioNode} from './web-audio-node';

export class Compressor extends WebAudioNode {

  compressor: DynamicsCompressorNode;
  input: AudioNode;
  output: AudioNode;

  constructor(
    audioCtx: AudioContext,
    threshold: number = -24,
    knee: number = 30,
    ratio: number = 12,
    attack: any = 0.003,
    release: number = 0.25) {
    super();
    this.compressor = audioCtx.createDynamicsCompressor();
    this.compressor.threshold.value = threshold; // The threshold property's default value is -24 and it can be set between -100 and 0.
    this.compressor.knee.value = knee; // The knee property's default value is 30 and it can be set between 0 and 40
    this.compressor.ratio.value = ratio; // The ratio property's default value is 12 and it can be set between 1 and 20.
    this.compressor.attack.value = attack; // The attack property's default value is 0.003 and it can be set between 0 and 1 (seconds).
    this.compressor.release.value = release; // The release property's default value is 0.25 and it can be set between 0 and 1 (seconds).

    // set WebAudioModule requirements
    this.input = this.compressor;
    this.output = this.compressor;

  }
}
