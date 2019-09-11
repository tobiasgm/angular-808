import { Buffer } from './buffer';

const audioContext = new AudioContext();

describe('Buffer', () => {
  it('should create an instance', () => {
    expect(new Buffer(audioContext, 1)).toBeTruthy();
  });
});
