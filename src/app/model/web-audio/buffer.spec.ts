import { Buffer } from './buffer';

describe('Buffer', () => {
  it('should create an instance', () => {
    expect(new Buffer(null)).toBeTruthy();
  });
});
