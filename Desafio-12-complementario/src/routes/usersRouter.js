import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  premiumUser,
  getDocuments,
} from "../controllers/users.controller.js";
import { upload } from "../middlewares/filesMiddlewares.js";

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

//SUBIR DOCUMENTOS
usersRouter.post("/:id/documents", upload.array("documents"), getDocuments);

export default usersRouter;
