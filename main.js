// // Proyecto Integrador - Servidor lista de tareas
// Instala NodeJS en tu máquina
// Crea un pequeño servidor que nos retorne en formato JSON un arreglo con una lista de tareas.
// Inicia el servidor y asegurate de que todo esté en orden.
// Utilizando npm instala nodemon para las tareas de reinicio de tu servidor.
// Realiza un cambio haciendo que cada tarea sea un objeto añadiendo a cada tarea una descripción, un estado de completado o pendiente y un identificador o id.
// Verifica los datos que envía.

// proyecto integrador, express 1 - Migración de servidor
// Instala NodeJS en tu máquina.
// Inicializa un proyecto con npm.
// Instala Express en el proyecto.
// Crea un pequeño servidor en Express que retorne en formato JSON un arreglo con una lista de tareas, el listado de tareas debe tener la siguiente estructura:
// {
//     "id":"123456",
//     "isCompleted":false,
//     "description":"Walk the dog",
// }
// Inicia el servidor y asegurate de que todo esté en orden.
// Verifica los datos que envía en respuesta a una petición.
// Si ya creaste este servidor con NodeJs:

// Migra dicho servidor para que funcione haciendo uso de Express.
// Nota: Estas instrucciones son para avanzar e impulsar el progreso en tu proyecto integrador, el cual será revisado durante el sprint review como parte de la presentación de proyectos. 💻

const express = require("express");
const app = express();
const host = "localhost";
const port = 8080;

app.use(express.json());
app.use(require("./rutas"));

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
