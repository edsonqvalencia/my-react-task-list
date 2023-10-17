const express = require("express");
const router = express.Router();

const tareitas = require("../tareas.json");

//se enlista todas las tareas
router.get("/", (req, res) => {
  res.json(tareitas);
});

// se busca la cantidad de tareas con el estado de incompleto y se devuelve la información de las mismas al ir a http://localhost:8080/status/completo
router.get("/completo", (req, res) => {
  const tareasCompletas = tareitas.filter(
    (tareas) => tareas.completado === true
  );
  if (tareasCompletas.length === 0) {
    res.status(404).send("No existen tareas completadas.");
  } else {
    res.json(tareasCompletas);
  }
});

// se busca la cantidad de tareas con el estado de incompleto y se devuelve la información de las mismas al ir a http://localhost:8080/status/incompleto
router.get("/incompleto", (req, res) => {
  const tareasIncompletas = tareitas.filter(
    (tareas) => tareas.completado === false
  );

  if (tareasIncompletas.length === 0) {
    res.status(404).send("no existen tareas incompletas");
  } else {
    res.json(tareasIncompletas);
  }
});

router.get("/:id", (req, res) => {
  const idTarea = req.params.id;
  const tarea = tareitas.find((t) => t.indicador === idTarea);

  if (!tarea) {
    res.status(404).json({ error: "Tarea no encontrada" });
  } else {
    res.json(tarea);
  }
});

module.exports = router;
