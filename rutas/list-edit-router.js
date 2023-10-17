const express = require("express");
const router = express.Router();
const fs = require("fs");
// se crea un array vacio que servira como contenedor de la información guardada en tareas.json
let tareitas = [];

// condicional que dice que, si existe el archivo tareas.json, entonces se extraerá la información y pondrá en el array anteriormente creado.
if (fs.existsSync("tareas.json")) {
  const data = fs.readFileSync("tareas.json");
  tareitas = JSON.parse(data);
}

// función creada para que, cada que la lista de tareas se cierre, se guarde la información cambiada en tareas.json
function guardarTareas() {
  fs.writeFileSync("tareas.json", JSON.stringify(tareitas), "utf8");
}

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

router.post("/tareas", (req, res) => {
  const nuevaTarea = req.body;
  tareitas.push(nuevaTarea);
  guardarTareas();
  res
    .status(201)
    .json({ mensaje: `la tarea fue añadida correctamente`, tarea: nuevaTarea });
});

router.patch("/tareas/:id", (req, res) => {
  const idTarea = req.params.id;
  const indexTarea = tareitas.findIndex(
    (laTarea) => laTarea.indicador === idTarea
  );

  if (indexTarea === -1) {
    res.status(404).json({ error: "Tarea no encontrada" });
  } else {
    tareitas[indexTarea].completado = true;
    guardarTareas();
    res.status(200).json({ Completada: tareitas[indexTarea] });
  }
});

router.delete("/tareas/:id", (req, res) => {
  const idTarea = req.params.id;
  const indexTarea = tareitas.findIndex(
    (laTarea) => laTarea.indicador === idTarea
  );

  if (indexTarea === -1) {
    res.send(404).json({ error: "Tarea no encontrada" });
  } else {
    const tareaEliminada = tareitas.splice(indexTarea, 1);
    guardarTareas();
    res.status(200).json({ eliminada: tareaEliminada[0] });
  }
});

module.exports = router;
