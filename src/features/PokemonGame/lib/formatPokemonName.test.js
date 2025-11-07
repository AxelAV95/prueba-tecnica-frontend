import { formatPokemonName } from './formatPokemonName';

describe('formatPokemonName', () => {
  test('returns empty string for falsy input', () => {
    expect(formatPokemonName(null)).toBe('');
    expect(formatPokemonName(undefined)).toBe('');
    expect(formatPokemonName('')).toBe('');
  });

  test('capitalizes single word name', () => {
    expect(formatPokemonName('pikachu')).toBe('Pikachu');
    expect(formatPokemonName('PIKACHU')).toBe('Pikachu');
  });

  test('replaces hyphens with spaces and capitalizes each part', () => {
    expect(formatPokemonName('mr-mime')).toBe('Mr Mime');
    expect(formatPokemonName('farfetchd')).toBe('Farfetchd');
  });
});
