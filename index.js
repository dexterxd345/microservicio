const express = require("express");
const cors = require("cors");
 
const app = express();
 
// Middlewares
app.use(cors());
app.use(express.json());
 
// Ruta base
app.get("/", (req, res) => {
  res.send(" Microservicio funcionando en Render");
});
 
// Base de datos simulada
let productos = [
  { id: 1, nombre: "Laptop", precio: 12000 },
  { id: 2, nombre: "Teclado", precio: 500 }
];
 
// Obtener todos
app.get("/api/productos", (req, res) => {
  res.json(productos);
});
 
// Obtener por ID
app.get("/api/productos/:id", (req, res) => {
  const producto = productos.find(p => p.id == req.params.id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(producto);
});
 
// Crear producto
app.post("/api/productos", (req, res) => {
  const nuevo = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio
  };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});
 
// Actualizar producto
app.put("/api/productos/:id", (req, res) => {
  const producto = productos.find(p => p.id == req.params.id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
 
  producto.nombre = req.body.nombre;
  producto.precio = req.body.precio;
 
  res.json(producto);
});
 
// Eliminar producto
app.delete("/api/productos/:id", (req, res) => {
  productos = productos.filter(p => p.id != req.params.id);
  res.json({ mensaje: "Producto eliminado" });
});
 
// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
 
// Escuchar
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});