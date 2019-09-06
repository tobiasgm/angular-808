export abstract class WebAudioNode {

  output: AudioNode;

  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    }
  }

  disconnect() {
    this.output.disconnect();
  }

}
