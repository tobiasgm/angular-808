import {Buffer} from './web-audio/buffer';
import {Gain} from './web-audio/gain';
import {StereoPanner} from './web-audio/stereo-panner';
import {Convolver} from './web-audio/convolver';

export class Track {
  id: number;
  filename: string;
  pattern: Array<number>;
  audiobuffer: AudioBuffer;
  inputgain: Gain;
  stereopanner: StereoPanner;
  convolver: Convolver;
  buffer: Buffer;
}
