export function executePrim(grafo, startNodeId, pintarArista, ctx) {
  if (!grafo.nodos.find((n) => n.id === startNodeId)) {
    alert("Nodo inicial no válido.");
    return;
  }

  const visited = new Set([startNodeId]);
  const edges = new Map();

  // Inicializa las aristas del nodo inicial
  grafo.nodos[startNodeId].vecinos.forEach((peso, vecino) => {
    const edgeKey = `${Math.min(startNodeId, vecino.id)}-${Math.max(
      startNodeId,
      vecino.id
    )}`;
    edges.set(edgeKey, { peso, from: grafo.nodos[startNodeId], to: vecino });
  });

  while (visited.size < grafo.nodos.length && edges.size > 0) {
    // Seleccionar la arista con menor peso que conecte con un nodo no visitado
    const nextEdge = Array.from(edges.entries()).reduce((min, [key, edge]) => {
      if (!visited.has(edge.to.id) && (!min || edge.peso < min.edge.peso)) {
        return { key, edge };
      }
      return min;
    }, null);

    if (!nextEdge) break;

    const { key, edge } = nextEdge;
    visited.add(edge.to.id);
    edges.delete(key);

    // Agregar nuevas aristas desde el nodo recién visitado
    edge.to.vecinos.forEach((peso, vecino) => {
      if (!visited.has(vecino.id)) {
        const newKey = `${Math.min(edge.to.id, vecino.id)}-${Math.max(
          edge.to.id,
          vecino.id
        )}`;
        if (!edges.has(newKey) || edges.get(newKey).peso > peso) {
          edges.set(newKey, { peso, from: edge.to, to: vecino });
        }
      }
    });

    // Pintar la arista en el canvas
    pintarArista(
      ctx,
      edge.from.x,
      edge.from.y,
      edge.to.x,
      edge.to.y,
      edge.peso,
      "green",
      true
    );
  }
}

export function executeDijkstra(
  grafo,
  startNodeId,
  endNodeId,
  pintarArista,
  ctx
) {
  if (
    !grafo.nodos.find((n) => n.id === startNodeId) ||
    !grafo.nodos.find((n) => n.id === endNodeId)
  ) {
    alert("Nodos inicial o final no válidos.");
    return;
  }

  const distances = new Map(grafo.nodos.map((nodo) => [nodo.id, Infinity]));
  const previous = new Map();
  const nodes = new Set(grafo.nodos.map((n) => n.id));
  const steps = [];

  distances.set(startNodeId, 0);

  while (nodes.size) {
    let currentNode = [...nodes].reduce(
      (minNode, nodeId) =>
        minNode === null || distances.get(nodeId) < distances.get(minNode)
          ? nodeId
          : minNode,
      null
    );

    if (currentNode === null || distances.get(currentNode) === Infinity) {
      alert(
        "No hay ruta disponible desde el nodo " +
          startNodeId +
          " al nodo " +
          endNodeId
      );
      return;
    }

    nodes.delete(currentNode);

    if (currentNode === endNodeId) {
      break;
    }

    const currentNodeObj = grafo.nodos.find((n) => n.id === currentNode);
    currentNodeObj.vecinos.forEach((weight, neighbour) => {
      let alt = distances.get(currentNode) + weight;
      if (alt < distances.get(neighbour.id)) {
        distances.set(neighbour.id, alt);
        previous.set(neighbour.id, currentNode);
      }
    });

    // Registrar los pasos para visualización
    steps.push({
      node: currentNode,
      distances: new Map(distances),
      previous: new Map(previous),
    });
  }

  // Llamada a una función que mostrará los pasos solo si hay un camino
  if (distances.get(endNodeId) !== Infinity) {
    displayDijkstraSteps(steps);
  }

  // Reconstruir y pintar el camino
  let path = [];
  for (
    let current = endNodeId;
    current !== undefined;
    current = previous.get(current)
  ) {
    path.unshift(current);
  }

  if (path.length > 1) {
    for (let i = 0; i < path.length - 1; i++) {
      const fromNode = grafo.nodos.find((n) => n.id === path[i]);
      const toNode = grafo.nodos.find((n) => n.id === path[i + 1]);
      pintarArista(
        ctx,
        fromNode.x,
        fromNode.y,
        toNode.x,
        toNode.y,
        fromNode.vecinos.get(toNode),
        "orange",
        true
      );
    }
  }
}

function displayDijkstraSteps(steps) {
  let html = `<table>
                <tr>
                  <th>Iteración</th>
                  <th>Nodo</th>
                  <th>Distancias</th>
                  <th>Predecesores</th>
                </tr>`;

  steps.forEach((step, index) => {
    html += `<tr>
               <td>${index + 1}</td>
               <td>${step.node}</td>
               <td>`;
    step.distances.forEach((dist, node) => {
      html += `${node}: ${dist === Infinity ? "∞" : dist}<br>`;
    });
    html += `</td><td>`;
    step.previous.forEach((pred, node) => {
      html += `${node}: ${pred !== undefined ? pred : "-"}<br>`;
    });
    html += `</td></tr>`;
  });

  html += "</table>";
  document.getElementById("dijkstra-steps").innerHTML = html;
}

export function floydWarshall(grafo) {
  const numVertices = grafo.nodos.length;
  let dist = Array.from({ length: numVertices }, () =>
    Array(numVertices).fill(Infinity)
  );
  let next = Array.from({ length: numVertices }, () =>
    Array(numVertices).fill(null)
  );

  // Inicializar la matriz de distancia y camino
  grafo.nodos.forEach((nodo, i) => {
    dist[i][i] = 0;
    nodo.vecinos.forEach((peso, vecino) => {
      dist[i][vecino.id] = peso;
      next[i][vecino.id] = vecino.id;
    });
  });

  // Aplicar el algoritmo Floyd-Warshall
  for (let k = 0; k < numVertices; k++) {
    for (let i = 0; i < numVertices; i++) {
      for (let j = 0; j < numVertices; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  return { dist, next };
}
