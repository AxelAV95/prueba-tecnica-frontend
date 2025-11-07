import { PokemonGame } from './features/PokemonGame/PokemonGame';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('/background.webp')] bg-cover bg-center">  
      <PokemonGame />
    </div>
  );
}

export default App;