import { Convolver } from './convolver';

const audioContext = new AudioContext();

describe('Convolver', () => {
  it('should create an instance', () => {
    expect(new Convolver(audioContext, null)).toBeTruthy();
  });
});
