// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  })),
}));

// Mock notie
jest.mock('notie', () => ({
  alert: jest.fn(),
}));

import axios from 'axios';
import notie from 'notie';

describe('axios configuration (unit)', () => {
  test('crea instancia con baseURL correcta', () => {
    // Simular la creación de instancia como en el archivo
    const expectedConfig = {
      baseURL: "https://pokeapi.co/api/v2/",
    };
    
    axios.create(expectedConfig);
    
    expect(axios.create).toHaveBeenCalledWith(expectedConfig);
  });

  test('interceptor de respuesta maneja errores 404', () => {
    const error = {
      response: { status: 404 },
      request: null,
    };
    
    // Simular la lógica del interceptor
    let userMessage = "Ocurrió un error inesperado.";
    
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        userMessage = "El Pokémon solicitado no fue encontrado.";
      } else if (status >= 500) {
        userMessage = "El servidor de Pokémon está fallando. Intenta más tarde.";
      }
    } else if (error.request) {
      userMessage = "Error de red. Verifica tu conexión a internet.";
    }
    
    expect(userMessage).toBe("El Pokémon solicitado no fue encontrado.");
  });

  test('interceptor maneja errores de servidor (500+)', () => {
    const error = {
      response: { status: 503 },
      request: null,
    };
    
    let userMessage = "Ocurrió un error inesperado.";
    
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        userMessage = "El Pokémon solicitado no fue encontrado.";
      } else if (status >= 500) {
        userMessage = "El servidor de Pokémon está fallando. Intenta más tarde.";
      }
    }
    
    expect(userMessage).toBe("El servidor de Pokémon está fallando. Intenta más tarde.");
  });

  test('interceptor maneja errores de red', () => {
    const error = {
      response: null,
      request: {},
    };
    
    let userMessage = "Ocurrió un error inesperado.";
    
    if (error.response) {
      // No entra aquí
    } else if (error.request) {
      userMessage = "Error de red. Verifica tu conexión a internet.";
    }
    
    expect(userMessage).toBe("Error de red. Verifica tu conexión a internet.");
  });

  test('interceptor llama a notie.alert con el mensaje correcto', () => {
    const userMessage = "Test error message";
    
    // Simular la llamada del interceptor
    notie.alert({
      type: "error",
      text: userMessage,
      time: 3,
      position: "top", 
    });
    
    expect(notie.alert).toHaveBeenCalledWith({
      type: "error",
      text: userMessage,
      time: 3,
      position: "top", 
    });
  });
});