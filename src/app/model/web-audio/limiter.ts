import {WebAudioNode} from './web-audio-node';

export class Limiter extends WebAudioNode {

  limiter: DynamicsCompressorNode;
  input: any;
  output: any;

  constructor(audioCtx) {
    super();
    this.limiter = audioCtx.createDynamicsCompressor();
    this.limiter.threshold.value = 0.0;
    this.limiter.knee.value = 0.0;
    this.limiter.ratio.value = 20.0;
    this.limiter.attack.value = 0.005; // 5ms
    this.limiter.release.value = 0.005; // 5ms

    this.input = this.limiter;
    this.output = this.limiter;
  }
}
