import {Track} from './track';

export const DEFAULTTRACKS: Track[] = [
  {
    id: 1,
    filename: 'Kick.mp3',
    pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    buffer: null,
    inputgain: null,
    stereopanner: null,
    convolver: null,
    audiobuffer: null
  },
  {
    id: 2,
    filename: 'Snare.mp3',
    pattern: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    buffer: null,
    inputgain: null,
    stereopanner: null,
    convolver: null,
    audiobuffer: null
  },
  {
    id: 3,
    filename: 'HiHat_Closed.mp3',
    pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    buffer: null,
    inputgain: null,
    stereopanner: null,
    convolver: null,
    audiobuffer: null
  }
];

export const NEWTRACK: Track = {
    id: 0,
    filename: 'Clava.mp3',
    pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    buffer: null,
    inputgain: null,
    stereopanner: null,
    convolver: null,
    audiobuffer: null
  };
