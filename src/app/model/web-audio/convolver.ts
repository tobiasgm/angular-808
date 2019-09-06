import {WebAudioNode} from './web-audio-node';

export class Convolver extends WebAudioNode {

  convNode: ConvolverNode;
  convGainNode: GainNode;
  bypassNode: GainNode;
  inputGain: GainNode;
  outputGain: GainNode;
  buffer: AudioBuffer;
  input: AudioNode;
  output: AudioNode;

  constructor(audioCtx, URL) {
    super();
    // use a gain stage as intermediate connection node
    this.buffer = null;

    // this.inputGain -> convNode (Convolver) -> convGainNode (Gain) -> this.outputGain
    //           ->            thisbypassNode (Gain)            ->
    this.convNode = audioCtx.createConvolver();
    this.convGainNode = audioCtx.createGain();
    this.bypassNode = audioCtx.createGain();
    this.inputGain = audioCtx.createGain();
    this.outputGain = audioCtx.createGain();

    this.inputGain.connect(this.convNode);
    this.inputGain.connect(this.bypassNode);
    this.convNode.connect(this.convGainNode);
    this.convGainNode.connect(this.outputGain);
    this.bypassNode.connect(this.outputGain);

    // set gain value
    this.inputGain.gain.value = 1;
    this.outputGain.gain.value = 1;

    // set WebAudioModule requirements
    this.input = this.inputGain;
    this.output = this.outputGain;

    window.fetch(URL)
      .then(response => response.arrayBuffer())
      .catch(e => console.log('error: ', e))
      .then(response => audioCtx.decodeAudioData(response, (audioBuffer) => {
        this.buffer = audioBuffer;
        this.convNode.buffer = this.buffer;
        // console.log("loaded", this.buffer);
      }));
  }

  setGain(value) {
    this.convGainNode.gain.value = value;
    this.bypassNode.gain.value = 1 - value;
  }

  destroy() {
    this.inputGain.disconnect(this.convNode);
    this.inputGain.disconnect(this.bypassNode);
    this.convNode.disconnect(this.convGainNode);
    this.buffer = null;
    this.convGainNode.disconnect(this.outputGain);
    this.bypassNode.disconnect(this.outputGain);
    this.convNode = null;
    this.convGainNode = null;
    this.bypassNode = null;
    this.inputGain = null;
    this.outputGain = null;
  }

}
