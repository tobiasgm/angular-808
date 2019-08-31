import {Buffer} from './web-audio/buffer';
import {Gain} from './web-audio/gain';
import {StereoPanner} from './web-audio/stereo-panner';

export class Track {
  id: number;
  volume: number;
  pan: number;
  filename: string;
  pattern: Array<number>;
  audiobuffer: AudioBuffer;
  inputgain: Gain;
  stereopanner: StereoPanner;
  buffer: Buffer;
}
