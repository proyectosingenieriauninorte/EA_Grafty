<div align="center">
  <h1>
    EA Grafty - Todo es un grafo
  </h1>

<img src="app/public/assets/images/EAGRAFTY.png" alt="Logo de EA Grafty" width="250"/>

<h4>
    Aprende los distintos algoritmos interactuando con grafos
  </h4>

[![GitHub Slrosales](https://img.shields.io/badge/by-Slrosales-purple)](https://github.com/Slrosales)
[![GitHub Rubens1414](https://img.shields.io/badge/by-Rubens1414-blue)](https://github.com/Rubens1414)
[![GitHub JaymedDLC](https://img.shields.io/badge/by-JaymedDLC-green)](https://github.com/JaymedDLC)
[![GitHub Almor21](https://img.shields.io/badge/by-wilsone24-orange)](https://github.com/wilsone24)

</div>

## Descripción y Justificación de la Herramienta
EA Grafty es una aplicación web interactiva diseñada para proporcionar una comprensión teórica e interactiva de los algoritmos de grafos más comunes. La herramienta ofrece explicaciones detalladas sobre diferentes algoritmos de grafos y en qué áreas son comúnmente utilizados. Además, proporciona visualizaciones interactivas del algoritmo de Prim, herramientas para entender el cálculo de la ruta más corta con el algoritmo de Dijkstra, y visualizaciones de matrices de recorrido y costo con el algoritmo de Floyd-Warshall. También cuenta con una zona interactiva que permite a los usuarios interactuar y modificar grafos en tiempo real.

Esta herramienta es invaluable para estudiantes y profesionales que deseen comprender mejor los algoritmos de grafos y su aplicación en diversos campos como la informática, las redes de comunicación, la logística y más.

## Características
- **Teoría**: Explicaciones detalladas sobre diferentes algoritmos de grafos y en que áreas son bastantes vistos.
- **Árbol de Expansión Mínima**: Visualización del algoritmo de Prim.
- **Algoritmo de Dijkstra**: Herramientas para entender el cálculo de la ruta más corta.
- **Algoritmo de Floyd-Warshall**: Incluye visualización de matrices de recorrido y costo.
- **Zona Interactiva**: Permite a los usuarios interactuar y modificar grafos en tiempo real.

## Tecnologías Utilizadas
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js
- Contenedorización: Docker

## Requisitos
- Docker
- Node.js (para ejecución sin Docker)

## Instalación y Ejecución

### Clonar el repositorio
```
git clone https://github.com/Slrosales/EA_Grafty.git
```
```
cd EA_Grafty
```

### Ejecución con Docker
Asegúrate de tener Docker instalado y ejecutando en tu sistema.

- Este comando es para construir la imagen con Docker Compose e iniciar el `http://localhost:3000`
```
docker-compose up --build
```

- Si la imagen ya esta construida solo ejecuta:
```
docker-compose up
```
- Si deseas ejecutar los contenedores en segundo plano:
```
docker-compose up -d
```

Accede a la aplicación a través de `http://localhost:3000` en tu navegador.

### Ejecución sin Docker
Ve a la carpeta `app` y ejecuta:

```
npm install
```
```
npm start
```
Accede a la aplicación a través de `http://localhost:3000` en tu navegador.

- **Reposicionamiento de un nodo**
  - Permitir al usuario cambiar la posición de cualquier nodo del grafo dentro del lienzo, manteniendo todas las aristas conectadas.

- **Lienzo personalizable**
  - Permitir al usuario subir una imagen (o seleccionar imágenes disponibles en la página) para cambiar el fondo del lienzo y ejemplificar así algunos usos de los grafos, como en mapas para rutas aéreas, redes de comunicación, entre otros.

## Team

-   Laura Gómez (Líder)
-   Rubens Apresa
-   Jaymed Linero
-   Wilson Estrada

:D
