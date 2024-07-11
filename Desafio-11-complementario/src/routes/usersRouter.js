import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  premiumUser,
} from "../controllers/users.controller.js";

const usersRouter = express.Router();

//MUESTRA LOS USUARIOS
usersRouter.get("/", getUsers);

//BUSCAR POR ID
usersRouter.get("/:id", getUserById);

//EDITAR USUARIO
usersRouter.put("/edit/:id", updateUser);

//ELIMINAR USUARIO
usersRouter.delete("/delete/:id", deleteUser);

//PASAR ROL USUARIO A PREMIUM
usersRouter.get("/premium/:id", premiumUser);

export default usersRouter;
