import { Compressor } from './compressor';

const audioContext = new AudioContext();

describe('Compressor', () => {
  it('should create an instance', () => {
    expect(new Compressor(audioContext)).toBeTruthy();
  });
});
