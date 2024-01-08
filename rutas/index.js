const express = require("express");
const router = express.Router();
const fs = require("fs");
const mongoose = require("mongoose");
const Tarea = require("../tareasModel");
const dotenv = require("dotenv");
const status = require("./list-view-router.js");
const accion = require("./list-edit-router.js");

dotenv.config();
router.use("/status", status); // puede ser /status/completo y /status/incompleto
router.use("/accion", accion); // puede ser /accion/add, accion/eliminar, o accion/ver

let tareasJSON = [];

// Middleware que admite a metodos HTTP validos
router.use((req, res, next) => {
  const metodosValidos = ["GET", "POST", "PUT", "DELETE", "PATCH"]; // Lista de métodos válidos

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
