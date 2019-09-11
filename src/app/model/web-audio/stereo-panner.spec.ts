import { StereoPanner } from './stereo-panner';

const audioContext = new AudioContext();

describe('StereoPanner', () => {
  it('should create an instance', () => {
    expect(new StereoPanner(audioContext)).toBeTruthy();
  });
});
