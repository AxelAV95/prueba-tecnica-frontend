import { formatPokemonName } from "../lib/formatPokemonName"; //uso una funcion reutilizable para formatear el nombre

export const OptionButton = ({
  name,
  onClick,
  disabled,
  isSelected,
  isCorrect,
  isAnswered,
}) => {
   
  //estas lineas de aca abajo son para manejar las clases CSS segun el estado del boton  
  let buttonClass = "option-button";

  if (isAnswered) {
    if (isCorrect) buttonClass += " correct";
    else if (isSelected) buttonClass += " wrong";
  } else if (isSelected) {
    buttonClass += " selected";
  }

  return (
    <button
      onClick={() => onClick(name)}
      disabled={disabled || isAnswered}
      className={buttonClass}
    >
      {formatPokemonName(name)} 
    </button>
  );
};
