// Proyecto Integrador - Autenticación en Express
// Abre el proyecto donde se creó el servidor.
// En tu repositorio crea una rama llamada project-4.
// Crea una ruta /login con el método POST para hacer el proceso de autenticación
// Implementa la creación de un JWT en la ruta /login para una serie de usuarios predefinidos en un array dentro de tu servidor
// Debes hacer uso de las variables de entorno configuradas en un archivo .env para el secreto usado en el JWT
// Crea una ruta protegida que haga la validación de un token JWT recibido dentro de un header de autorización que esté en la petición.
// Se deben devolver en cada uno de los casos los mensajes de error pertinentes.
// Nota: Estas instrucciones son para avanzar e impulsar el progreso en tu proyecto integrador, el cual será revisado durante el sprint review como parte de la presentación de proyectos. 💻

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const port = 8080;

dotenv.config();

const users = [
  { id: 1, email: "edsonqv2411@gmail.com", contraseña: "contraseña1" },
  { id: 2, email: "edsonqv1124@gmail.com", contraseña: "contraseña2" },
];

app.use(express.json());

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
