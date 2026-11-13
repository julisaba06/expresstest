//CRUD: create, read, update, delete

import express from "express";

const app = express();

app.use(express.json());

const users = {
  1: { id: 1, name: "Ana" },
  2: { id: 2, name: "Luis" },
  3: { id: 3, name: "Carla" },
};

app.get("/", (req, res) => {
  res.send("Bienvenidos a mi API");
});
app.get("/users", (req, res) => {
  res.send(users);
});

app.put("/users", (req, res) => {
   const id = parseInt(req.params.id)
   const datosactualizados= req.body
     if (!users[id]) {
        return res.status(200).json({ mensaje: "no encontrado" });
    }
    users[id]={
    ...users[id],
    ...datosactualizados,
    id
    }

return res.status(200).json(users[id])
});

app.post("/users/create", (req, res) => {
    const nuevouser = req.body

    if (!nuevouser.name){
        return res.status(200).json({ mensaje: "no encontrado" })
    }
    const id = Object.keys(users).lenght + 1
    users[id] = {id, ... nuevouser}

    res.status(201).json(users[id])
});

app.delete("/users/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!users[id]) {
    return res.status(200).json({ mensaje: "no encontrado" });
  }
  delete users[id];
  return res.status(400).json({ mensaje: "Usuario borrado correctamente" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});