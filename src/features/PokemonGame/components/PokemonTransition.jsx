import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PokeballImage from '/pokeball.webp'; 

export const PokemonTransition = ({ isVisible }) => {
  const pokeballRef = useRef(null);
  const containerRef = useRef(null);
  
  //aqui se maneja la animación de la pokeball
  useEffect(() => {
    if (isVisible) {
      gsap.to(containerRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(pokeballRef.current, {
        rotation: 360, //hago que rote completamente
        duration: 1,
        ease: "none",
        repeat: -1,
      });
    } else {
      gsap.to(containerRef.current, { opacity: 0, duration: 0.3 });
      gsap.killTweensOf(pokeballRef.current);
      gsap.set(pokeballRef.current, { rotation: 0 });
    }
  }, [isVisible]);


  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center  bg-opacity-75 z-50 opacity-0 pointer-events-none"
    >
      <img
        ref={pokeballRef}
        src={PokeballImage}
        alt="Cargando..."
        className="w-24 h-24"
      />
    </div>
  );
};