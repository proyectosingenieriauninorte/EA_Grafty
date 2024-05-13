export function pintarNodo(ctx, x, y, id, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "15px Arial";
  ctx.textAlign = "center";
  ctx.fillText(id.toString(), x, y + 6);
}

export function pintarArista(
  ctx,
  x1,
  y1,
  x2,
  y2,
  peso,
  color = "black",
  isThick = false
) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const adjustment = 30; // Ajustar para no dibujar sobre los nodos.
  const adjustedX1 = x1 + adjustment * Math.cos(angle);
  const adjustedY1 = y1 + adjustment * Math.sin(angle);
  const adjustedX2 = x2 - adjustment * Math.cos(angle);
  const adjustedY2 = y2 - adjustment * Math.sin(angle);

  ctx.strokeStyle = color;
  ctx.lineWidth = isThick ? 4 : 1; // Líneas más gruesas para caminos destacados.
  ctx.beginPath();
  ctx.moveTo(adjustedX1, adjustedY1);
  ctx.lineTo(adjustedX2, adjustedY2);
  ctx.stroke();

  // Calcular la posición del peso para evitar la superposición directa con la línea.
  const offset = 15; // Offset para alejar el texto de la línea
  const midX = (adjustedX1 + adjustedX2) / 2;
  const midY = (adjustedY1 + adjustedY2) / 2;

  // Determinar la dirección del desplazamiento basada en el ángulo para evitar superposición
  const offsetY = angle > 0 && angle < Math.PI ? -offset : -offset; // Ajustar para la mitad superior e inferior del plano

  ctx.fillStyle = "red";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(peso.toString(), midX, midY + offsetY);
}

export function limpiarCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}

export function redibujarGrafo(ctx, grafo) {
  // Limpia el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibuja todos los nodos
  grafo.nodos.forEach((nodo) => {
    pintarNodo(ctx, nodo.x, nodo.y, nodo.id);
  });

  // Dibuja todas las aristas
  grafo.nodos.forEach((nodo) => {
    nodo.vecinos.forEach((peso, vecino) => {
      pintarArista(ctx, nodo.x, nodo.y, vecino.x, vecino.y, peso);
    });
  });
}
