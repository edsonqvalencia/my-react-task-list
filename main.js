const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const connectDB = require("./db");
const port = 8080;

app.use(express.json());
dotenv.config();

connectDB();

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
