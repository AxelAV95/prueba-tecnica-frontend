//esta función la hice para formatear los nombres de los Pokémon, porque 
// algunos vienen con guiones y todo en minúsculas
export const formatPokemonName = (name) => {
  if (!name) return ""; 
  return name
    .split("-") //aqui separo por guiones
    .map( //aqui capitalizo cada palabra
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
    )
    .join(" "); //y aqui junto todo con espacios
};