import { Gain } from './gain';

const audioContext = new AudioContext();

describe('Gain', () => {
  it('should create an instance', () => {
    expect(new Gain(audioContext)).toBeTruthy();
  });
});
