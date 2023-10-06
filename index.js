// // Proyecto Integrador - Servidor lista de tareas
// Instala NodeJS en tu máquina
// Crea un pequeño servidor que nos retorne en formato JSON un arreglo con una lista de tareas.
// Inicia el servidor y asegurate de que todo esté en orden.
// Utilizando npm instala nodemon para las tareas de reinicio de tu servidor.
// Realiza un cambio haciendo que cada tarea sea un objeto añadiendo a cada tarea una descripción, un estado de completado o pendiente y un identificador o id.
// Verifica los datos que envía.

const http = require("http");
const fs = require("fs");
const host = "localhost";
const port = 8080;

let tareasJSON = [];

const requestListener = function (req, res) {
  const url = new URL(req.url, `http://localhost:${port}/`);
  if (url.pathname === "/tareas") {
    if (fs.existsSync("tareas.json")) {
      const data = fs.readFileSync("tareas.json");
      tareasJSON = JSON.parse(data);
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(tareasJSON));
  } else {
    res.writeHead(200);
    res.end();
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Servidor en funcionamiento en la ruta http://${host}:${port}`);
});
