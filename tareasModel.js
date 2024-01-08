const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  indicador: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  completado: {
    type: Boolean,
    required: true,
  },
});

const Tarea = mongoose.model("tareas", tareaSchema);

module.exports = Tarea;
