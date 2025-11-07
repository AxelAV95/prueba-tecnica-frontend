import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const PokemonImage = ({ imageUrl, fallbackImageUrl, gameState }) => {
  const imageRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(imageUrl);

  // se hace la animación de entrada cuando cambia la imagen
  useEffect(() => {
    setCurrentSrc(imageUrl);
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, [imageUrl]); 

  const handleError = () => {
    if (currentSrc !== fallbackImageUrl) setCurrentSrc(fallbackImageUrl);
  };

  //aqui lo importante es que cuando el estado del juego cambia, se aplica un filtro de brillo
  useEffect(() => {
    gsap.to(imageRef.current, {
      filter: gameState === 'playing' ? 'brightness(0)' : 'brightness(1)',
      duration: 0.5,
      ease: 'power2.out'
    });
  }, [gameState]);

  if (!imageUrl) return null;

  return (
    <div className="h-48 w-48 my-8 flex items-center justify-center">
      <img
        ref={imageRef}
        src={currentSrc}
        onError={handleError}
        alt="Pokémon"
        className="h-full w-full object-contain"
        style={{ filter: 'brightness(0)' }} 
      />
    </div>
  );
};
