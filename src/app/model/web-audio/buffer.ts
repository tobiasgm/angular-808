import {WebAudioNode} from './web-audio-node';

export class Buffer extends WebAudioNode {

  gain: GainNode;
  buffer: AudioBufferSourceNode;
  input: GainNode;

  constructor(audioCtx) {
    super();
    // use a gain stage as intermediate connection node
    this.gain = audioCtx.createGain();
    this.buffer = null;

    // set gain value
    this.gain.gain.value = 1;

    // set WebAudioModule requirements
    this.input = this.gain;
    this.output = this.gain;
  }

  play(audioCtx, time, audioBuffer) {
    this.buffer = audioCtx.createBufferSource();
    this.buffer.buffer = audioBuffer;
    this.buffer.connect(this.gain);
    this.buffer.start(time);
  }

  playWithOffset(audioCtx, time, offset, audioBuffer) {
    this.buffer = audioCtx.createBufferSource();
    this.buffer.buffer = audioBuffer;
    this.buffer.connect(this.gain);
    this.buffer.start(time, offset);
  }

  stop(time) {
    if (this.buffer) {
      this.buffer.stop(time);
    }
  }

  setDetune(cents) {
    if (this.buffer) {
      this.buffer.detune.value = cents;
    } // value in cents
  }

  setPlaybackRate(value) {
    if (this.buffer) {
      this.buffer.playbackRate.value = value;
    }
  }

  loop(s) {
    if (this.buffer) {
      this.buffer.loop = s;
    }
  }

  setLoopStart(time) {
    if (this.buffer) {
      this.buffer.loopStart = time;
    }
  }

  setLoopEnd(time) {
    if (this.buffer) {
      this.buffer.loopEnd = time;
    }
  }

  destroy() {
    if (this.buffer) {
      this.buffer.disconnect(this.gain);
    }
  }
}
