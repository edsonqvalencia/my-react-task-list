const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use("/status", require("./list-view-router.js")); // puede ser /status/completo y /status/incompleto
router.use("/accion", require("./list-edit-router.js")); // puede ser /accion/añadir, accion/eliminar, o accion/ver

let tareasJSON = [];

router.get("/", (req, res) => {
  if (fs.existsSync("tareas.json")) {
    const data = fs.readFileSync("tareas.json");
    tareasJSON = JSON.parse(data);
  }

  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(tareasJSON));
});

module.exports = router;
