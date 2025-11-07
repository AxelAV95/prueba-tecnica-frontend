import { usePokemonGame } from './hooks/usePokemonGame';
import { PokemonImage } from './components/PokemonImage';
import { OptionButton } from './components/OptionButton';
import { PokemonTransition } from './components/PokemonTransition';

export const PokemonGame = () => {
    const {
        pokemonToGuess,
        options,
        gameState,
        isTransitioning,
        handleOptionClick,
        fetchNewRound,
        selectedOption,
        correctOption
    } = usePokemonGame();

    const isLoading = gameState === 'loading' || !pokemonToGuess;

    return (
        // 'relative' es clave para que PokemonTransition (absolute) funcione
        <div className="relative flex flex-col items-center p-6 rounded-xl  w-full max-w-md min-h-[500px] justify-center overflow-hidden">

            <PokemonTransition isVisible={isTransitioning || isLoading} />

            {/* Ocultamos el contenido del juego si está cargando (excepto la transición) */}
            <div className={`flex flex-col items-center w-full ${isTransitioning || isLoading ? 'opacity-0' : 'opacity-100'}`}>

                <h1 className="text-4xl  text-[#FFCC13] mb-4 font-title text-center">
                    ¿Quién es este Pokémon?
                </h1>


                <PokemonImage
                    key={pokemonToGuess?.id}
                    imageUrl={pokemonToGuess?.image}
                    gameState={gameState}
                />

                <div className="grid grid-cols-2 gap-4 w-full">
                    {options.map((name) => (
                        <OptionButton
                            key={name}
                            name={name}
                            onClick={handleOptionClick}
                            disabled={gameState === 'answered'}
                             isSelected={selectedOption === name}
                              isCorrect={correctOption === name}
                              isAnswered={gameState === "answered"}
                        />
                    ))}
                </div>

                {gameState === 'answered' && (
                    <button onClick={fetchNewRound} className="pokemon-button mt-6">
                        <img
                            src="/pokeball.webp"
                            alt="Pokeball"
                            className="pokeball-icon"
                        />
                        <span>Nuevo juego</span>
                    </button>


                )}
            </div>
        </div>
    );
};