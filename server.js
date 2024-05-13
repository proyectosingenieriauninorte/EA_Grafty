const express = require("express");
const app = express();
const PORT = 3000;

// Servir archivos estáticos
app.use(express.static("public"));

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
