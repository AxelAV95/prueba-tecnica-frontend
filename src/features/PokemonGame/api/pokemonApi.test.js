// pruebas para funciones puras de pokemonApi
import { fetchPokemonData, getPokemonSpriteUrl } from './pokemonApi';

// Mockear la instancia de axios usada en src/lib/axios.js
jest.mock('../../../lib/axios', () => ({
  pokeApi: {
    get: jest.fn(),
  },
}));

import { pokeApi } from '../../../lib/axios';

describe('pokemonApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getPokemonSpriteUrl construye la URL correcta', () => {
    expect(getPokemonSpriteUrl(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    );
  });

  test('fetchPokemonData devuelve response.data', async () => {
    const fakeData = { id: 1, name: 'bulbasaur' };
    pokeApi.get.mockResolvedValue({ data: fakeData });

    const result = await fetchPokemonData(1);
    expect(pokeApi.get).toHaveBeenCalledWith('pokemon/1');
    expect(result).toEqual(fakeData);
  });
});
