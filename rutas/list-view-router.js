const express = require("express");
const router = express.Router();
const Tarea = require("../tareasModel");
// const tareitas = require("../tareas.json");

//se enlista todas las tareas
router.get("/", async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener datos de MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// se busca la cantidad de tareas con el estado de incompleto y se devuelve la información de las mismas al ir a http://localhost:8080/status/completo
router.get("/completo", async (req, res) => {
  try {
    const tareasCompletas = await Tarea.find({ completado: true });
    if (tareasCompletas.length === 0) {
      res.status(404).send("No existen tareas completadas.");
    } else {
      res.json(tareasCompletas);
    }
  } catch (error) {
    console.error("Error al obtener tareas completas de MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// se busca la cantidad de tareas con el estado de incompleto y se devuelve la información de las mismas al ir a http://localhost:8080/status/incompleto
router.get("/incompleto", async (req, res) => {
  try {
    const tareasIncompletas = await Tarea.find({ completado: false });
    if (tareasIncompletas.length === 0) {
      res.status(404).send("No existen tareas incompletas");
    } else {
      res.json(tareasIncompletas);
    }
  } catch (error) {
    console.error("Error al obtener tareas incompletas de MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (error) {
    console.error("Error al obtener tarea por ID de MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
