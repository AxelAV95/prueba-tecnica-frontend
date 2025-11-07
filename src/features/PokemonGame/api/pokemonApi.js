import { pokeApi } from '../../../lib/axios'; // importar la instancia de axios

/**
 * Obtiene los datos principales de un Pokémon por ID.
 */
export const fetchPokemonData = async (id) => {
  const response = await pokeApi.get(`pokemon/${id}`);
  return response.data; // Solo devolvemos los datos
};

/**
 * Devuelve la URL de la imagen
 * En el documento se recomendaba ‘https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/o
ther/dream-world/${Number}.svg, pero se cambió a official-artwork porque algunas imágenes en dream-world no cargan.
 */
export const getPokemonSpriteUrl = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

