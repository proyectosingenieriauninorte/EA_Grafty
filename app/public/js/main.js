import { Grafo, Nodo } from "./graph.js";
import { pintarNodo, pintarArista, limpiarCanvas } from "./pintar.js";
import { executePrim, executeDijkstra, floydWarshall } from "./algorithms.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  let grafo = new Grafo();
  let selectedNodes = [];
  let deleteMode = false;

  // Ajusta el tamaño del canvas para mantener la proporción correcta
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    updateCanvas(); // Redibuja el grafo para reflejar los cambios
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas(); // Inicializa el tamaño del canvas al cargar

  const modeToggle = document.getElementById("directed-mode-toggle");
  modeToggle.addEventListener("change", () => {
    if (
      confirm(
        "Cambiar de modo eliminará todos los nodos y aristas actuales. ¿Desea continuar?"
      )
    ) {
      grafo = new Grafo(); // Reinicia el grafo
      grafo.dirigido = modeToggle.checked; // Verifica si el modo Dirigido esta activado
      updateCanvas(); // Redibuja el canvas vacío
    } else {
      modeToggle.checked = !modeToggle.checked; // Revierte el cambio de checkbox si el usuario cancela
    }
  });

  // Redibuja todos los elementos del grafo
  function updateCanvas() {
    limpiarCanvas(ctx, canvas.width, canvas.height);
    grafo.nodos.forEach((nodo) => {
      pintarNodo(ctx, nodo.x, nodo.y, nodo.id, "blue");
      nodo.vecinos.forEach((peso, vecino) => {
        pintarArista(
          ctx,
          nodo.x,
          nodo.y,
          vecino.x,
          vecino.y,
          peso,
          "black",
          false,
          grafo.dirigido
        );
      });
    });

    mostrarGradoGrafo(); // Actualiza el grado del grafo
    mostrarCostoTotal(); // Actualiza el costo total del grafo
  }

  // Agrega o elimina nodos y aristas al interactuar con el canvas
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (deleteMode) {
      const nodo = grafo.encontrarNodoPorPosicion(x, y);
      if (nodo) {
        if (grafo.dirigido) {
          grafo.eliminarNodoDirigido(nodo.id);
        } else {
          grafo.eliminarNodo(nodo.id);
        }
        updateCanvas();
      }
    } else {
      if (!grafo.encontrarNodoPorPosicion(x, y)) {
        grafo.agregarNodo(x, y);
        updateCanvas();
      }
    }
  });

  // Permite añadir aristas con clic derecho
  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const nodo = grafo.encontrarNodoPorPosicion(x, y);
    if (nodo) {
      manageSelectedNodes(nodo);
    }
  });

  // Maneja la selección de nodos para añadir aristas
  function manageSelectedNodes(nodo) {
    if (selectedNodes.includes(nodo)) {
      selectedNodes = selectedNodes.filter((n) => n !== nodo);
      pintarNodo(ctx, nodo.x, nodo.y, nodo.id, "blue");
    } else if (selectedNodes.length < 2) {
      selectedNodes.push(nodo);
      pintarNodo(ctx, nodo.x, nodo.y, nodo.id, "red");
      if (selectedNodes.length === 2) {
        const weight = prompt("Ingrese el peso de la arista:", "1");
        if (weight) {
          grafo.agregarArista(
            selectedNodes[0].id,
            selectedNodes[1].id,
            parseInt(weight)
          );
          updateCanvas();
          selectedNodes = [];
        }
      }
    }
  }

  // Calcula y muestra el costo total y el grado del grafo
  function mostrarCostoTotal() {
    const costoTotal = calcularCostoTotal();
    document.getElementById(
      "costo-total"
    ).innerText = `Costo total del grafo: ${costoTotal}`;
  }

  function calcularCostoTotal() {
    let costoTotal = 0;
    const seenEdges = new Set(); // Para asegurar que cada arista se cuenta una sola vez
    grafo.nodos.forEach((nodo) => {
      nodo.vecinos.forEach((peso, vecino) => {
        const edgeKey = `${Math.min(nodo.id, vecino.id)}-${Math.max(
          nodo.id,
          vecino.id
        )}`;
        if (!seenEdges.has(edgeKey)) {
          costoTotal += peso;
          seenEdges.add(edgeKey);
        }
      });
    });
    return costoTotal;
  }

  function mostrarGradoGrafo() {
    const gradoGrafo = calcularGradoGrafo();
    document.getElementById(
      "grado-grafo"
    ).innerText = `Grado del grafo: ${gradoGrafo}`;
  }

  // Función para calcular el grado del grafo
  function calcularGradoGrafo() {
    let gradoGrafo = 0;
    grafo.nodos.forEach((nodo) => {
      gradoGrafo += nodo.vecinos.size;
    });
    return gradoGrafo;
  }

  // Elimina aristas entre nodos
  function deleteArista(startNodeId, endNodeId) {
    const startNode = grafo.nodos.find((n) => n.id === startNodeId);
    const endNode = grafo.nodos.find((n) => n.id === endNodeId);
    if (startNode && endNode) {
      grafo.eliminarArista(startNodeId, endNodeId);
      updateCanvas();
      alert("Arista eliminada exitosamente.");
    } else {
      alert("Arista no encontrada.");
    }
  }

  document.getElementById("execute-delete").addEventListener("click", () => {
    const startNodeId = parseInt(
      document.getElementById("start-node-delete").value,
      10
    );
    const endNodeId = parseInt(
      document.getElementById("end-node-delete").value,
      10
    );
    if (!isNaN(startNodeId) && !isNaN(endNodeId)) {
      deleteArista(startNodeId, endNodeId);
    } else {
      alert("Por favor, ingrese IDs válidos de nodos.");
    }
  });

  // Configura el modo de eliminación de nodos y aristas
  const deleteModeToggle = document.getElementById("delete-mode-toggle");
  deleteModeToggle.addEventListener("change", () => {
    deleteMode = deleteModeToggle.checked;
    updateCanvas();
  });

  // Ejecuta el algoritmo de Prim para MST
  document.getElementById("calculate-mst").addEventListener("click", () => {
    const startNodeId = parseInt(document.getElementById("start-node").value);
    if (!isNaN(startNodeId)) {
      updateCanvas();
      executePrim(grafo, startNodeId, pintarArista, ctx);
    } else {
      alert("Por favor, ingrese un número válido.");
    }
  });

  // Ejecuta el algoritmo de Dijkstra para caminos mínimos
  document.getElementById("execute-dijkstra").addEventListener("click", () => {
    const startNodeId = parseInt(
      document.getElementById("start-node-dijkstra").value
    );
    const endNodeId = parseInt(
      document.getElementById("end-node-dijkstra").value
    );
    if (!isNaN(startNodeId) && !isNaN(endNodeId)) {
      updateCanvas();
      executeDijkstra(grafo, startNodeId, endNodeId, pintarArista, ctx);
    } else {
      alert("Por favor, ingrese números válidos.");
    }
  });

  // Ejecuta Floyd-Warshall para calcular las matrices de distancia y camino
  document.getElementById("runFloyd").addEventListener("click", () => {
    const { dist, next } = floydWarshall(grafo);
    displayMatrix(
      dist,
      "Matriz de Costo",
      document.getElementById("cost-matrix")
    );
    displayMatrix(
      next,
      "Matriz de Recorrido",
      document.getElementById("path-matrix")
    );
  });
});

function displayMatrix(matrix, title, container) {
  let html = `<h3>${title}</h3><table><tr><th></th>`;

  // Añadir encabezados de columnas
  for (let i = 0; i < matrix.length; i++) {
    html += `<th>${i}</th>`;
  }
  html += "</tr>";

  matrix.forEach((row, rowIndex) => {
    html += `<tr><th>${rowIndex}</th>`; // Encabezado de fila para cada fila de la matriz
    row.forEach((value) => {
      html += `<td>${value === Infinity ? "∞" : value}</td>`; // Usar '∞' para representar el Infinity
    });
    html += "</tr>";
  });

  html += "</table>";
  container.innerHTML = html;
}
