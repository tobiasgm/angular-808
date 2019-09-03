import { Limiter } from './limiter';

describe('Limiter', () => {
  it('should create an instance', () => {
    expect(new Limiter(null)).toBeTruthy();
  });
});
