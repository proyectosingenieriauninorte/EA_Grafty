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
  isThick = false,
  dirigido = false
) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const adjustment = 30;
  const adjustedX1 = x1 + adjustment * Math.cos(angle);
  const adjustedY1 = y1 + adjustment * Math.sin(angle);
  const adjustedX2 = x2 - adjustment * Math.cos(angle);
  const adjustedY2 = y2 - adjustment * Math.sin(angle);

  // Dibujar la línea o flecha
  ctx.strokeStyle = color;
  ctx.lineWidth = isThick ? 4 : 1;
  ctx.beginPath();
  ctx.moveTo(adjustedX1, adjustedY1);
  ctx.lineTo(adjustedX2, adjustedY2);
  ctx.stroke();

  if (dirigido) {
    // Dibujar la punta de la flecha
    const arrowLength = 10;
    const arrowWidth = 5;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(adjustedX2, adjustedY2);
    ctx.lineTo(
      adjustedX2 - arrowLength * Math.cos(angle - Math.PI / 6),
      adjustedY2 - arrowLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      adjustedX2 - arrowLength * Math.cos(angle + Math.PI / 6),
      adjustedY2 - arrowLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  }

  // Ajustar la posición del texto para evitar superposiciones
  const offset = 15;
  const textOffsetY = angle > 0 && angle < Math.PI ? -offset : offset;
  const midX = (adjustedX1 + adjustedX2) / 2;
  const midY = (adjustedY1 + adjustedY2) / 2;

  ctx.fillStyle = "red";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(peso.toString(), midX, midY + textOffsetY + 5);
}

export function limpiarCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}
