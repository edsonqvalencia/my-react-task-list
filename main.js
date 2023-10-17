// REST API Lista de tareas
// Abre el proyecto donde se creó el servidor.
// En tu repositorio crea una rama llamada project-5.
// Implementa bajo los estándares de REST un API para una lista de tareas, este API debe permitir:

// Crear una nueva tarea
// Actualizar una tarea.
// Eliminar una tarea.
// Listar todas las tareas
// Listar las tareas completas y las incompletas
// Obtener una sola tarea.

// Se debé implementar las respuestas en formato JSON y se debe crear un endpoint diferente para cada una de las posibles acciones.
// Se debé hacer un uso adecuado de los códigos de estado del protocolo HTTP para cada respuesta.
// Nota: Estas instrucciones son para avanzar e impulsar el progreso en tu proyecto integrador, el cual será revisado durante el sprint review como parte de la presentación de proyectos. 💻

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const port = 8080;

dotenv.config();
app.use(express.json());

const users = [
  { id: 1, email: "edsonqv2411@gmail.com", contraseña: "contraseña1" },
  { id: 2, email: "edsonqv1124@gmail.com", contraseña: "contraseña2" },
];

// autenticación con login

app.post("/login", (req, res) => {
  const { email, contraseña } = req.body;

  const usuario = users.find(
    (elUsuario) =>
      elUsuario.email === email && elUsuario.contraseña === contraseña
  );

  if (!usuario) {
    return res.status(401).json({ error: "contraseña o email invalidos." });
  }

  const payload = {
    email: users.email,
    contraseña: users.contraseña,
  };

  const token = jwt.sign(payload, process.env.SECRETO, {
    expiresIn: "10m",
  });

  res.json({ token });
});

//ruta protegida
app.get("/protegido", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No tienes acceso" });
  }

  jwt.verify(token, process.env.SECRETO, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "No tienes acceso, token invalido" });
    }
    if (decoded) {
      res.status(200).json({ mensaje: "acceso concedido", usuario: decoded });
    }
  });
});

const rutas = require("./rutas");
app.use(rutas);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: http://localhost:${port}`);
});
