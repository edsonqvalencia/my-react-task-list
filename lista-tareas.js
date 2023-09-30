// Lista de tareas node
// Inicializa un proyecto de npm.
// Haz un script que permita crear una lista de tareas, cada tarea debe contener un indicador, descripción y estado (completada o no).
// Deben existir las funciones para poder añadir, eliminar y completar tareas.
// Se debe poder elegir que función ejecutar por consola, se puede usar readline.
// Ejecuta el script usando Nodejs y comprueba que todo funcione.
// Subelo a github en un repostorio llamado node-server a una rama llamada funciones-lista-tareas y compartenos el enlace 😎.

const readline = require("readline");
const fs = require("fs");

const readlineTareas = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tareas = [];

if (fs.existsSync("tareas.json")) {
  const data = fs.readFileSync("tareas.json");
  tareas = JSON.parse(data);
}

function guardarTareas() {
  fs.writeFileSync("tareas.json", JSON.stringify(tareas), "utf8");
}

function añadirTarea(indicador, descripcion) {
  tareas.push({ indicador, descripcion, completado: false });
}

function chauTarea(indicador) {
  const index = tareas.findIndex(
    (encontrarTareas) => encontrarTareas.indicador === indicador
  );
  if (index !== -1) {
    tareas.splice(index, 1);
  }
}

function completar(indicador) {
  const completarTarea = tareas.find(
    (tareaCompleta) => tareaCompleta.indicador === indicador
  );
  if (completarTarea) {
    completarTarea.completed = true;
  }
}

function lista() {
  console.log("Lista de tareas: ");
  tareas.forEach((tarea) => {
    const status = tarea.completed ? "[X]" : "[]";
    console.log(`${status}  ${tarea.indicador}: ${tarea.descripcion}`);
  });
}

readlineTareas.question(
  "Elige una acción (añadir/eliminar/completar/ver lista/salir): ",
  (accion) => {
    if (accion === "salir") {
      guardarTareas();
      readlineTareas.close();
    } else if (accion === "añadir") {
      readlineTareas.question("Indicador de tarea: ", (indicador) => {
        readlineTareas.question("Descripción de la tarea: ", (descripcion) => {
          añadirTarea(indicador, descripcion);
          lista();
          guardarTareas();
          readlineTareas.close();
        });
      });
    } else if (accion === "eliminar") {
      readlineTareas.question(
        "Indicador de tarea a eliminar: ",
        (indicador) => {
          chauTarea(indicador);
          lista();
          guardarTareas();
          readlineTareas.close();
        }
      );
    } else if (accion === "completar") {
      readlineTareas.question(
        "Indicador de tarea completada: ",
        (indicador) => {
          completar(indicador);
          lista();
          guardarTareas();
          readlineTareas.close();
        }
      );
    } else if (accion === "ver lista") {
      lista();
      readlineTareas.close();
    }
  }
);
