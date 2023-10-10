// Lista de tareas node
// Inicializa un proyecto de npm.
// Haz un script que permita crear una lista de tareas, cada tarea debe contener un indicador, descripción y estado (completada o no).
// Deben existir las funciones para poder añadir, eliminar y completar tareas.
// Se debe poder elegir que función ejecutar por consola, se puede usar readline.
// Ejecuta el script usando Nodejs y comprueba que todo funcione.
// Subelo a github en un repostorio llamado node-server a una rama llamada funciones-lista-tareas y compartenos el enlace 😎.
// ---------------------------------------------------------------------------------------------------------------------------
// Lista de tareas asíncrona en node
// Abre el proyecto que creaste en el módulo anterior.
// Crea una nueva rama llamada node-promises.
// Modifica tus funciones de crear, eliminar y completar tareas para que retornen una promesa.
// Al ejecutar por consola el programa se debe esperar a que se resuelvan las promesas.
// Prueba usando async y await.
// Prueba usando el método then().
// Crea un archivo README.md y responde las siguientes preguntas.
// ¿Qué sucedio al usar async y await?
// ¿Qué sucedio al usar el método then()?
// ¿Qué diferencias encontraste entre async, await y el método then()?

// requerimos readline y fs, para interactividad entre terminal-usuario y lectura de otros archivos
const readline = require("readline");
const fs = require("fs");

// esto no recuerdo que era
const readlineTareas = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// se crea un array vacio que servira como contenedor de la información guardada en tareas.json
let tareas = [];

// condicional que dice que, si existe el archivo tareas.json, entonces se extraerá la información y pondrá en el array anteriormente creado.
if (fs.existsSync("tareas.json")) {
  const data = fs.readFileSync("tareas.json");
  tareas = JSON.parse(data);
}

// función creada para que, cada que la lista de tareas se cierre, se guarde la información cambiada en tareas.json
function guardarTareas() {
  fs.writeFileSync("tareas.json", JSON.stringify(tareas), "utf8");
}

// función para añadir tareas en el array
function añadirTarea(indicador, descripcion) {
  return new Promise((resolve, reject) => {
    const añadir = tareas.push({ indicador, descripcion, completado: false });
    if (añadir) {
      resolve(añadir);
    } else {
      reject("No se pudo añadir.");
    }
  });
}

// función para eliminar las tareas que estaban en el array
function chauTarea(indicador) {
  return new Promise((resolve, reject) => {
    const index = tareas.findIndex(
      (encontrarTareas) => encontrarTareas.indicador === indicador
    );
    if (index !== -1) {
      tareas.splice(index, 1);
      resolve();
    } else {
      reject(console.log("No se encontró el indicador que proporcionaste."));
    }
  });
}

// función para completar tareas
function completar(indicador) {
  return new Promise((resolve, reject) => {
    const completarTarea = tareas.find(
      (tareaCompleta) => tareaCompleta.indicador === indicador
    );
    if (completarTarea) {
      completarTarea.completado = true;
      resolve(completarTarea);
    } else reject("No se pudo completar la tarea, intente de nuevo");
  });
}

// función para que se pueda ver la lista de tareas
function lista() {
  console.log("Lista de tareas: ");
  tareas.forEach((tarea) => {
    const status = tarea.completado ? "[X]" : "[]";
    console.log(`${status}  ${tarea.indicador}: ${tarea.descripcion}`);
  });
}

// con readline se puede interactuar con el usuario mediante la terminal, con lo uqe se le pide que elija una acción y, segun lo que requiera, se ejecutará junto con el llamado de las funciones creadas con anterioridad
readlineTareas.question(
  "Elige una acción (añadir/eliminar/completar/ver lista/salir): ",
  (accion) => {
    if (accion === "salir") {
      guardarTareas();
      readlineTareas.close();
    } else if (accion === "añadir") {
      readlineTareas.question("Indicador de tarea: ", (indicador) => {
        readlineTareas.question(
          "Descripción de la tarea: ",
          async (descripcion) => {
            await añadirTarea(indicador, descripcion).catch((data) => {
              console.log(data);
            });
            lista();
            guardarTareas();
            readlineTareas.close();
          }
        );
      });
    } else if (accion === "eliminar") {
      readlineTareas.question(
        "Indicador de tarea a eliminar: ",
        async (indicador) => {
          await chauTarea(indicador).catch((data) => {
            console.log(data);
          });
          lista();
          guardarTareas();
          readlineTareas.close();
        }
      );
    } else if (accion === "completar") {
      readlineTareas.question(
        "Indicador de tarea completada: ",
        (indicador) => {
          completar(indicador)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
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

//terminada la lista de tareas en node
