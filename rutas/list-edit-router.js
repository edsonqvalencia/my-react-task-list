const express = require("express");
const router = express.Router();
const Tarea = require("../tareasModel");
// const fs = require("fs");
// // se crea un array vacio que servira como contenedor de la información guardada en tareas.json
// let tareitas = [];

// // condicional que dice que, si existe el archivo tareas.json, entonces se extraerá la información y pondrá en el array anteriormente creado.
// if (fs.existsSync("tareas.json")) {
//   const data = fs.readFileSync("tareas.json");
//   tareitas = JSON.parse(data);
// }

// // función creada para que, cada que la lista de tareas se cierre, se guarde la información cambiada en tareas.json
// function guardarTareas() {
//   fs.writeFileSync("tareas.json", JSON.stringify(tareitas), "utf8");
// }

// middleware para responder con un 400 si el body no tiene cuerpo o si le falta algun atributo al hacer un request post
router.post("/tareas", (req, res, next) => {
  const atributosRequeridos = ["indicador", "descripcion", "completado"];
  const faltaAtributos = atributosRequeridos.filter(
    (atributos) => !Object.keys(req.body).includes(atributos)
  );

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Ingrese información valida.");
  } else if (faltaAtributos.length > 0) {
    return res
      .status(400)
      .send(
        "Falta información, verifique y envíe toda la información requerida."
      );
  } else {
    next();
  }
});

// middleware para responder con un 400 si el body no tiene cuerpo o si le falta algun atributo al hacer un request put
router.patch("/tareas/:id", (req, res, next) => {
  const atributosRequeridos = ["indicador"];
  const faltaAtributos = atributosRequeridos.filter(
    (atributos) => !Object.keys(req.body).includes(atributos)
  );

  if (Object.keys(req.body).length === 0 || Object.keys(req.body).length > 1) {
    return res.status(400).send("Ingrese información valida.");
  } else if (faltaAtributos.length > 0) {
    return res
      .status(400)
      .send(
        "Falta información, verifique y envíe toda la información requerida."
      );
  } else {
    next();
  }
});

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener datos de MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    const tareaGuardada = await nuevaTarea.save();
    res.status(201).json(tareaGuardada);
  } catch (error) {
    console.error("Error al guardar nueva tarea en MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener una tarea por ID
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

// Actualizar una tarea por ID
router.put("/:id", async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tareaActualizada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(tareaActualizada);
  } catch (error) {
    console.error("Error al actualizar tarea por ID en MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar una tarea por ID
router.delete("/:id", async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!tareaEliminada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ eliminada: tareaEliminada });
  } catch (error) {
    console.error("Error al eliminar tarea por ID en MongoDB:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
