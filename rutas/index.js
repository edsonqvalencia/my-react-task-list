const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use("/status", require("./list-view-router.js")); // puede ser /status/completo y /status/incompleto
router.use("/accion", require("./list-edit-router.js")); // puede ser /accion/add, accion/eliminar, o accion/ver

let tareasJSON = [];

// Middleware que admite a metodos HTTP validos
router.use((req, res, next) => {
  const metodosValidos = ["GET", "POST", "PUT", "DELETE"]; // Lista de métodos válidos

  if (!metodosValidos.includes(req.method)) {
    return res.status(405).json({ error: "Método HTTP no permitido" });
  } else {
    next();
  }
});

router.get("/", (req, res) => {
  if (fs.existsSync("tareas.json")) {
    const data = fs.readFileSync("tareas.json");
    tareasJSON = JSON.parse(data);
  }

  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(tareasJSON));
});

module.exports = router;
