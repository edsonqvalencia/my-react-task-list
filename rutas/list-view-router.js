const express = require("express");
const router = express.Router();

const tareitas = require("../tareas.json");

router.get("/:estado", (req, res, next) => {
  let estado = req.params.estado;

  if (estado !== "completo" && estado !== "incompleto") {
    res.status(404).send("Not found");
  } else {
    next();
  }
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

module.exports = router;
