# PokéGame Clone - Prueba Técnica

**Clonación del sitio web "PokéGame"** - Implementación completa desarrollada como prueba técnica utilizando React 19 y Vite. 

El proyecto replica la funcionalidad del juego original donde el usuario debe adivinar el nombre del Pokémon mostrado en silueta, seleccionando entre 4 opciones disponibles. Incluye animaciones fluidas, manejo de estados del juego, y arquitectura escalable basada en características (features).

## Demo

- Live: https://pokegame-assessment.netlify.app/

## Funcionalidades implementadas

✅ **Juego principal**: Adivinar el Pokémon mostrado en silueta  
✅ **Selección múltiple**: 4 opciones aleatorias por ronda  
✅ **Feedback visual**: Animaciones y notificaciones de éxito/error  
✅ **Transiciones**: Animación de Pokeball durante carga  
✅ **API integración**: Consumo de PokeAPI para datos reales  
✅ **Responsive**: Adaptable a diferentes tamaños de pantalla  
✅ **Arquitectura escalable**: Organización por features (Screaming Architecture)  

## Tecnologías y herramientas usadas

- **Frontend**: React 19 + Vite (ESM, Fast Refresh)
- **Estilos**: Tailwind CSS (utility-first)
- **HTTP**: Axios (interceptors, error handling)
- **Animaciones**: GSAP (transiciones, efectos visuales)
- **Notificaciones**: notie (feedback al usuario)
- **Calidad**: ESLint + Prettier
- **Testing**: Jest + Babel (pruebas unitarias)
- **API externa**: [PokeAPI](https://pokeapi.co/) (datos Pokémon)

Dependencias principales se encuentran en `package.json`.

## Scripts disponibles

Usar desde la raíz del proyecto (Windows cmd):

```
npm install
npm run dev       # inicia el server de desarrollo (Vite)
npm run build     # genera la versión de producción (build)
npm run preview   # vista previa de la build (Vite)
```

## Cómo ejecutar el proyecto (local)

1. Clona el repositorio:

```
git clone https://github.com/AxelAV95/prueba-tecnica-frontend.git
cd "prueba-tecnica-frontend"
```

2. Instala dependencias:

```
npm install
```

3. Inicia el servidor de desarrollo:

```
npm run dev
```

4. Abre el navegador en la URL que Vite muestre (por defecto: http://localhost:5173).

## Build y despliegue

Para preparar la app para producción:

```
npm run build
```

Puedes desplegar la carpeta `dist/` en servicios como Vercel, Netlify o cualquier hosting estático. Para una vista previa local de la build:

```
npm run preview
```

## Estructura del proyecto (resumen)

La estructura principal relevante:

```
src/
	App.jsx
	main.jsx
	index.css
	features/
		PokemonGame/
			PokemonGame.jsx
			api/
				pokemonApi.js
			components/
				OptionButton.jsx
				PokemonImage.jsx
				PokemonTransition.jsx
			hooks/
				usePokemonGame.js
			lib/
				formatPokemonName.js
	lib/
		axios.js
```

Explicación breve:
- `features/PokemonGame` sigue una organización por característica (feature folder) — cada característica agrupa componentes, hooks, API y utilidades relacionadas.
- `lib/axios.js` contiene la instancia/ configuración de Axios para centralizar llamadas HTTP.

## Arquitectura y decisiones técnicas

### Screaming Architecture (Feature-based)

**¿Por qué esta arquitectura?**
- **Claridad del dominio**: La estructura "grita" que es un juego de Pokémon al ver `src/features/PokemonGame/`
- **Escalabilidad**: Fácil añadir nuevas features (`MultiplayerGame/`, `PokemonCollection/`, etc.)
- **Cohesión**: Todo lo relacionado a una característica está junto (componentes + lógica + API + tests)

### Estructura por capas
```
src/features/PokemonGame/
├── PokemonGame.jsx          # Componente principal (orquestador)
├── hooks/usePokemonGame.js  # Lógica de negocio (estados, efectos)
├── components/              # UI reutilizable (botones, imágenes, transiciones)
├── api/pokemonApi.js        # Acceso a datos (PokeAPI)
└── lib/formatPokemonName.js # Utilidades específicas del dominio
```

### Separación de responsabilidades
- **UI Layer** (`components/`): Solo presentación, recibe props
- **Logic Layer** (`hooks/`): Estados, efectos, lógica de juego
- **Data Layer** (`api/`): Comunicación HTTP, transformación datos
- **Utils Layer** (`lib/`): Funciones puras, helpers específicos

## Buenas prácticas aplicadas

### 🎯 **Arquitectura y organización**
- **Single Responsibility**: Cada componente/función tiene una responsabilidad única
- **Separation of Concerns**: UI, lógica, y datos están claramente separados
- **Feature-first**: Organización por funcionalidades, no por tipo de archivo

### 🔧 **Desarrollo y calidad**
- **Custom Hooks**: Lógica reutilizable encapsulada (`usePokemonGame`)
- **Error Boundaries**: Interceptors HTTP para manejo centralizado de errores
- **Type Safety**: ESLint configurado para detectar errores tempranos
- **Performance**: Vite para HMR rápido, lazy loading implícito

### 🎨 **UX y animaciones**
- **Feedback inmediato**: Notificaciones toast con `notie`
- **Transiciones fluidas**: GSAP para animaciones profesionales
- **Estados visuales**: Loading, playing, answered con transiciones apropiadas
- **Responsive Design**: Tailwind CSS para adaptabilidad móvil

### 🧪 **Testing y mantenibilidad**
- **Pruebas unitarias**: Jest enfocado en lógica pura y funciones críticas
- **Mocking estratégico**: APIs y dependencias externas mockeadas
- **Coverage reporting**: Métricas de cobertura para identificar áreas no probadas

## Decisiones de implementación

### ✅ **Cumplimiento de requisitos técnicos**
- **Funcionalidad core**: Juego "adivinar Pokémon" completamente funcional
- **Integración API**: Consumo real de PokeAPI (datos actualizados)
- **UX/UI**: Animaciones, feedback visual, responsive design
- **Arquitectura**: Código limpio, escalable y mantenible
- **Testing**: Cobertura de lógica crítica con Jest

### 🚀 **Mejoras implementadas (más allá de requisitos básicos)**
- **Animaciones avanzadas**: GSAP para transiciones profesionales
- **Error handling robusto**: Interceptors, fallbacks, user feedback
- **Performance**: Vite + React 19 (última versión estable)
- **Developer Experience**: ESLint, scripts automatizados, documentación

### 🔮 **Roadmap futuro (fuera de scope actual)**
- **TypeScript**: Migración gradual para type safety
- **CI/CD**: GitHub Actions (lint + tests automáticos)
- **PWA**: Service workers, offline mode
- **Features adicionales**: Modo multijugador, sistema de puntuación, colección Pokémon
- **Performance**: Code splitting, imagen optimization, caching strategies


## Pruebas Unitarias (Jest)

Se implementaron pruebas unitarias enfocadas en **lógica pura** y **funciones helpers**, evitando pruebas de UI para mantener simplicidad y velocidad.

### ¿Qué se prueba?

| Área               | Archivo                              | Qué se prueba                                   | Tipo              |
| ------------------ | ------------------------------------ | ----------------------------------------------- | ----------------- |
| ✅ Helpers          | `formatPokemonName.js`               | formateo correcto de nombres                    | función pura      |
| ✅ Lógica del juego | `usePokemonGame.js`                  | generación IDs, estados, validación respuestas  | lógica pura       |
| ✅ API              | `pokemonApi.js`                      | URL correcta, manejo de errores, mock axios     | función asíncrona |
| ✅ Utilidades       | `src/lib/axios.js`                   | configuración, interceptors de error            | función pura      |

### Pasos para ejecutar las pruebas (Windows cmd)

1. **Instalar dependencias** (si no lo hiciste ya):

```bat
npm install
```

2. **Ejecutar todas las pruebas** y generar reporte de coverage:

```bat
npm test
```

3. **Ejecutar en modo watch** (útil durante desarrollo):

```bat
npm run test:watch
```

4. **Ver reporte de coverage detallado**:
   - Después de `npm test`, abre `coverage/lcov-report/index.html` en el navegador.

### Estructura de tests

```
src/
  features/PokemonGame/
    lib/
      formatPokemonName.test.js     # ✅ función pura
    api/
      pokemonApi.test.js            # ✅ API + mocks
    hooks/
      usePokemonGame.test.js        # ✅ lógica del juego
  lib/
    axios.test.js                   # ✅ configuración HTTP
```

### Notas técnicas

- **Configuración**: Jest (`jest.config.cjs`) + Babel (`babel.config.cjs`) para transformar JSX.
- **Entorno**: `testEnvironment: 'node'` (no DOM) para velocidad y simplicidad.
- **Filosofía**: Probar **comportamiento y lógica**, no implementación de UI.
- **Coverage objetivo**: >80% en funciones críticas (helpers, API, lógica de negocio).

## Evaluación técnica

### 📋 **Checklist de cumplimiento**
- [x] Funcionalidad principal implementada (juego Pokémon)
- [x] Integración con API externa (PokeAPI)
- [x] Arquitectura escalable (Screaming Architecture)
- [x] UI/UX pulida (animaciones, responsive)
- [x] Código limpio y documentado
- [x] Pruebas unitarias (lógica crítica)
- [x] README completo con instrucciones

### 🎯 **Puntos destacados**
- **Tiempo de desarrollo**: Implementación completa y funcional
- **Calidad técnica**: Separación de responsabilidades, patrones modernos
- **User Experience**: Animaciones fluidas, feedback inmediato
- **Mantenibilidad**: Código auto-documentado, tests unitarios

---

**Desarrollado como prueba técnica** - Demostración de competencias en React, arquitectura de software, y desarrollo frontend moderno.
