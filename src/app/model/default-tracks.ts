import {Track} from './track';

export const DEFAULTTRACKS: Track[] = [
  {
    id: 1,
    filename: 'Kick.mp3',
    pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    buffer: null,
    inputgain: null,
    inputgainValue: 1,
    stereopanner: null,
    stereopannerValue: 0.5,
    convolver: null,
    convolverValue: 0.3,
    audiobuffer: null
  },
  {
    id: 2,
    filename: 'Snare.mp3',
    pattern: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    buffer: null,
    inputgain: null,
    inputgainValue: 0.8,
    stereopanner: null,
    stereopannerValue: -0.9,
    convolver: null,
    convolverValue: 0.6,
    audiobuffer: null
  },
  {
    id: 3,
    filename: 'HiHat_Closed.mp3',
    pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    buffer: null,
    inputgain: null,
    inputgainValue: 0.8,
    stereopanner: null,
    stereopannerValue: 0.9,
    convolver: null,
    convolverValue: 0.6,
    audiobuffer: null
  }
];

export const NEWTRACK: Track = {
  id: 0,
  filename: 'Clava.mp3',
  pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  buffer: null,
  inputgain: null,
  inputgainValue: 1,
  stereopanner: null,
  stereopannerValue: 0.5,
  convolver: null,
  convolverValue: 0.5,
  audiobuffer: null
};
