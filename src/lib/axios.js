import axios from "axios";
import notie from "notie";

//aqui creo una instancia de axios con la URL base de la PokeAPI
export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

// declaro un interceptor de respuesta para manejar errores globalmente
pokeApi.interceptors.response.use(
  (response) => {
    // aquí entraría cualquier código 2xx
    return response;
  },
  (error) => {
    // y aquí entra cualquier código fuera de 2xx
    console.error("Error de API (Interceptor):", error);

    let userMessage = "Ocurrió un error inesperado.";

    if (error.response) {
      // El servidor respondió (404, 500, etc.)
      const status = error.response.status;
      if (status === 404) {
        userMessage = "El Pokémon solicitado no fue encontrado.";
      } else if (status >= 500) {
        userMessage =
          "El servidor de Pokémon está fallando. Intenta más tarde.";
      }
    } else if (error.request) {
      // aqui puede que la solicitud se haya hecho pero no hubo respuesta
      userMessage = "Error de red. Verifica tu conexión a internet.";
    }

    // muestro un mensajillo de error al usuario
    notie.alert({
      type: "error",
      text: userMessage,
      time: 3,
      position: "top", 
    });

    // y aquí es mejor rechazar la promesa para que el .catch() en el hook pueda actuar
    return Promise.reject(error);
  }
);
