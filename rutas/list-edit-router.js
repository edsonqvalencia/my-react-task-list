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

router.post("/add", (req, res) => {
  const nuevaTarea = req.body;
  tareitas.push(nuevaTarea);
  guardarTareas();
  return res.send({ tareitas });
});

router.delete("/eliminar", (req, res) => {
  const { indicador } = req.body;

  const chauTarea = tareitas.find(
    (encontrarTareas) => encontrarTareas.indicador === indicador
  );

  const tareaEliminada = tareitas.splice(tareitas.indexOf(chauTarea), 1)[0];
  guardarTareas();

  res.send(
    `La tarea: ${tareaEliminada.indicador}: ${tareaEliminada.descripcion} fue eliminada exitosamente.`
  );
});

router.put("/completar", (req, res) => {
  const { indicador } = req.body;
  const completarTarea = tareitas.map((tarea) => {
    if (tarea.indicador === indicador) {
      return { ...tarea, completado: true };
    }
    return tarea;
  });

  tareitas = completarTarea;
  guardarTareas();
  res.send(`La tarea con indicador ${indicador} se marcó como completada.`);
});

module.exports = router;
