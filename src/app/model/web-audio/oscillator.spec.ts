import {Oscillator, SQUARE} from './oscillator';

const audioContext = new AudioContext();

describe('Oscillator', () => {
  it('should create an instance', () => {
    expect(new Oscillator(SQUARE, audioContext)).toBeTruthy();
  });
});
