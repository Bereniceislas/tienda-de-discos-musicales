// server.js
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = "clave_secreta_jwt";

const usuarios = [
  { username: "admin", password: "1234" },
  { username: "usuario", password: "abcd" }
];

const productosDisponibles = [
  { id: 1, nombre: "Disco Bruno Mars", precio: 100 },
  { id: 2, nombre: "Disco Michael Jackson", precio: 120 },
  { id: 3, nombre: "Disco Maroon 5", precio: 80 },
  { id: 4, nombre: "Disco Ariana Grande", precio: 150 },
  { id: 5, nombre: "Disco Shawn Mendes", precio: 90 },
  { id: 6, nombre: "Disco The Weeknd", precio: 200 }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware JWT
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ mensaje: "❌ Token requerido" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) return res.status(403).json({ mensaje: "❌ Token inválido" });
    req.usuario = usuario;
    next();
  });
}

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const usuario = usuarios.find(u => u.username === username && u.password === password);

  if (usuario) {
    const token = jwt.sign({ username: usuario.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ mensaje: "✅ Login exitoso", token });
  } else {
    res.status(401).json({ mensaje: "❌ Usuario o contraseña incorrectos" });
  }
});

// Carrito
let carritos = {};

app.get('/carrito', verificarToken, (req, res) => {
  const carrito = carritos[req.usuario.username] || [];
  res.json({ carrito });
});

app.post('/carrito/add', verificarToken, (req, res) => {
  const { id } = req.body;
  const prod = productosDisponibles.find(p => p.id === id);

  if (!prod) return res.status(404).json({ mensaje: "Producto no encontrado" });

  if (!carritos[req.usuario.username]) carritos[req.usuario.username] = [];
  carritos[req.usuario.username].push(prod);

  res.json({ carrito: carritos[req.usuario.username] });
});

// 👉 Exportamos app para poder usarla en las pruebas
module.exports = app;
