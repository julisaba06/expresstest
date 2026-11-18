//CRUD: create, read, update, delete

import express from "express";

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Luis" },
  { id: 3, name: "mirko" },
];

app.get("/", (req, res) => {
  res.send("Bienvenidos a mi API");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req,res) =>{
const id = parseInt(req.params.id)
const indice = users.findIndex(user=> user.id === id);
if (indice === -1) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado"
    });
  }
  return res.status(200).json(users[indice]);
});



app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const datosactualizados = req.body;

  const indice = users.findIndex(user => user.id === id);
  
  if (indice === -1) {
    return res.status(200).json({ mensaje: "no encontrado" });
  }
  users[indice] = {
    ...users[indice],
    ...datosactualizados,
    id,
  };

  return res.status(200).json(users[indice]);
});

app.post("/users/create", (req, res) => {
  const nuevouser = req.body;

  if (!nuevouser.name) {
    return res.status(200).json({ mensaje: "no encontrado" });
  }
  const id = Number(users.length + 1);
  const nuevoUsuario = { id, ...nuevouser };
  users.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

app.delete("/users/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

   const indice = users.findIndex(user => user.id === id);
  if (indice === -1) {
    return res.status(200).json({ mensaje: "no encontrado" });
  }
  users.splice(indice, 1)  
  return res.status(400).json({ mensaje: "Usuario borrado correctamente" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});
