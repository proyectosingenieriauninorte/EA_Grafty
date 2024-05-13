export class Nodo {
  constructor(id, x, y) {
    this.id = id; // Identificador único para el nodo
    this.x = x; // Coordenada x del nodo en el plano
    this.y = y; // Coordenada y del nodo en el plano
    this.vecinos = new Map(); // Mapa para guardar las aristas y sus pesos
    this.mstAristas = new Set(); // Conjunto para guardar aristas que son parte del Árbol de Expansión Mínima (MST)
  }
}

export class Grafo {
  constructor() {
    this.nodos = []; // Lista de nodos en el grafo
  }

  // Función para eliminar una arista entre dos nodos
  eliminarArista(id1, id2) {
    const nodo1 = this.nodos.find((n) => n.id === id1);
    const nodo2 = this.nodos.find((n) => n.id === id2);

    if (nodo1 && nodo2) {
      nodo1.vecinos.delete(nodo2);
      nodo2.vecinos.delete(nodo1);
      nodo1.mstAristas.delete(nodo2);
      nodo2.mstAristas.delete(nodo1);
    }
  }

  // Función para agregar un nuevo nodo al grafo
  agregarNodo(x, y) {
    const id = this.nodos.length;
    const nodo = new Nodo(id, x, y);
    this.nodos.push(nodo);
    return nodo;
  }

  // Función para agregar una arista entre dos nodos existentes con un peso específico
  agregarArista(id1, id2, peso) {
    const nodo1 = this.nodos[id1];
    const nodo2 = this.nodos[id2];
    if (nodo1 && nodo2) {
      nodo1.vecinos.set(nodo2, peso);
      nodo2.vecinos.set(nodo1, peso);
    }
  }

  // Función para eliminar un nodo del grafo
  eliminarNodo(id) {
    const index = this.nodos.findIndex((n) => n.id === id);
    if (index !== -1) {
      const [nodo] = this.nodos.splice(index, 1);
      nodo.vecinos.forEach((_, vecino) => {
        vecino.vecinos.delete(nodo);
        vecino.mstAristas.delete(nodo);
      });
      this.reasignarIDs();
    }
  }

  // Función para reasignar los IDs de los nodos después de eliminar un nodo
  reasignarIDs() {
    this.nodos.forEach((nodo, index) => {
      nodo.id = index;
    });
  }

  // Función para encontrar un nodo por su posición en el plano
  encontrarNodoPorPosicion(x, y) {
    return this.nodos.find((n) => Math.hypot(n.x - x, n.y - y) <= 40);
  }
}
