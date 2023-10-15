// Servidor Lista de Tareas Express Middlewares
// Abre el proyecto donde se creó servidor.
// En tu repositorio crea una rama llamada project-3.
// Crea un middleware para tu router list-edit-router, que maneje los siguientes errores retornando un código de respuesta 400:
// Solicitudes POST con el cuerpo vacio
// Solicitudes POST que tengan información no valida o atributos faltantes para crear las tareas
// Solicitudes PUT con el cuerpo vacio
// Solicitudes PUT que tengan información no valida o atributos faltantes para crear las tareas
// Crea un middleware a nivel de aplicación para gestionar que solo llegen solicitudes por métodos http validos dentro del servidor, de lo contrario debe devolver el error.
// Crea un middleware para tu direccionador list-view-router, que gestione qué los parámetros seán correctos de lo contrario debe devolver el error.
// Recuerda que express permite responder codigos de HTML de la siguiente forma

// const express = require('express')
// const app = express()

// app.use(express.json());

// app.get("/this-should-exists", (req, res)=>{
//     res.status(404).send("Not found")
// });

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
