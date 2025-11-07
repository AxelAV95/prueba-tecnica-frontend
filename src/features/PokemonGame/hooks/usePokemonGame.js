//Este archivo centraliza toda la lógica del juego de adivinar el Pokémon :D

import { useState, useEffect, useCallback } from "react";
import { formatPokemonName } from "../lib/formatPokemonName"; //reutilitario para formatear nombres
import { fetchPokemonData, getPokemonSpriteUrl } from "../api/pokemonApi";
import notie from "notie";

const POKEMON_MAX_ID = 898; // El id máximo de Pokémon disponible
const TRANSITION_DURATION = 1000; // 1 segundo (en ms)

export const usePokemonGame = () => {
  const [pokemonToGuess, setPokemonToGuess] = useState(null);
  const [options, setOptions] = useState([]);
  const [gameState, setGameState] = useState("loading"); // se manejan 3 estados del juego 'loading', 'playing', 'answered'
  const [isTransitioning, setIsTransitioning] = useState(false); // para manejar la animación de transición
  const [selectedOption, setSelectedOption] = useState(null); //para guardar la opción seleccionada
  const [correctOption, setCorrectOption] = useState(null); //para guardar la opción correcta

  // Función para obtener 4 IDs aleatorios y únicos
  const generateRandomIds = () => {
    const ids = new Set();
    while (ids.size < 4) {
      ids.add(Math.floor(Math.random() * POKEMON_MAX_ID) + 1);
    }
    return Array.from(ids);
  };

  // Función principal para cargar una nueva ronda
  const fetchNewRound = useCallback(async () => { //Uso usecallback para evitar recrear la función en cada render
    //se resetean los estados
    setIsTransitioning(true);
    setSelectedOption(null);
    setCorrectOption(null);

    // Retraso para la animación de la Pokeball
    setTimeout(async () => {
      try {
        const randomIds = generateRandomIds(); //se generan 4 IDs aleatorios
        const correctId = randomIds[Math.floor(Math.random() * 4)]; //se elige uno como el correcto

        const pokemonPromises = randomIds.map((id) => fetchPokemonData(id)); //aqui se hacen las peticiones
        const pokemonDataList = await Promise.all(pokemonPromises); //y aqui se esperan todas

        const names = pokemonDataList.map((p) => p.name); //se extraen los nombres nada más
        const correctPokemon = pokemonDataList.find((p) => p.id === correctId); //y tambien el Pokémon correcto

        //se establece el estado con los datos obtenidos
        setPokemonToGuess({
          id: correctPokemon.id,
          name: correctPokemon.name,
          image: getPokemonSpriteUrl(correctPokemon.id),
        });
        //tambien las opciones
        setOptions(names.sort(() => Math.random() - 0.5)); 
        setGameState("playing"); //se cambia el estado a 'playing'
        setIsTransitioning(false); //y se termina la transición
      } catch (error) {
        //aqui se maneja cualquier error ocurrido durante la carga
        console.error("Error capturado en el hook:", error);
        setIsTransitioning(false);
        setGameState("error"); //tambien se puede definir un estado de error
      }
    }, TRANSITION_DURATION); // Espera a que termine la animación
  }, []);

  // Cargar el primer juego al montar el componente
  useEffect(() => {
    fetchNewRound();
  }, [fetchNewRound]);

  // Manejar el clic del usuario
  const handleOptionClick = (selectedName) => {
    if (gameState !== "playing") return; // aqui es importante no hacer nada si no estamos jugando

    setSelectedOption(selectedName); //se define la opción seleccionada
    setCorrectOption(pokemonToGuess.name);  //se define la opción correcta
    setGameState("answered"); //se define el estado como respondido

    //aqui se muestra una notificación según si acertó o no
    if (selectedName === pokemonToGuess.name) {
      notie.alert({
        type: "success",
        text: `¡Correcto! Es <span class="font-notie">${formatPokemonName(
          pokemonToGuess.name
        )}</span>`,
        time: 5,
        position: "top",
      });
    } else {
      notie.alert({
        type: "error",
        text: `¡Oops! Era <span class="font-notie">${formatPokemonName(
          pokemonToGuess.name
        )}</span>`,
        time: 5,
        position: "top",
      });
    }
  };

  return {
    pokemonToGuess,
    options,
    gameState,
    isTransitioning,
    handleOptionClick,
    fetchNewRound,
    selectedOption,
    correctOption,
  };
};
