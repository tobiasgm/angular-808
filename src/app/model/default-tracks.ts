import {Track} from './track';

export const DEFAULTTRACKS: Track[] = [
  {
    id: 1,
    volume: 1,
    pan: 0,
    filename: 'Kick.wav',
    pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    buffer: null,
    inputgain: null,
    stereopanner: null,
    audiobuffer: null
  },
  {
    id: 2,
    volume: 1,
    pan: 0,
    filename: 'Snare.wav',
    pattern: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    buffer: null,
    inputgain: null,
    stereopanner: null,
    audiobuffer: null
  },
  {
    id: 3,
    volume: 1,
    pan: 0,
    filename: 'HiHatClosed.wav',
    pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    buffer: null,
    inputgain: null,
    stereopanner: null,
    audiobuffer: null
  }
];

export const NEWTRACK: Track = {
    id: 0,
    volume: 1,
    pan: 0,
    filename: 'Rimshot.wav',
    pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    buffer: null,
    inputgain: null,
    stereopanner: null,
    audiobuffer: null
  };
