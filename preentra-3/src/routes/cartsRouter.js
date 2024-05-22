import express from "express";
import {
  cartByIdd,
  creatCart,
  cartAddProduct,
  cartDeleteProduct,
  cartDeleteAll,
  updatQuantity,
  updatCart,
} from "../controllers/carts.controller.js";
//import checkRole from "../middlewares/checkRole.middlewares.js";

const cartsRouter = express.Router();

//MOSTRAR EL CARRITO POR ID
cartsRouter.get("/:cid", cartByIdd);

//CREA UN NUEVO CARRITO
cartsRouter.post("/create", creatCart);

//AGREGA UN PRODUCTO AL CARRITO
cartsRouter.post("/:cid/product/:pid", cartAddProduct); //checkRole("usuario"),

//ELIMINA EL PRODUCTO DEL CARRITO
cartsRouter.delete("/:cid/products/:pid", cartDeleteProduct);

//ELIMINA TODOS LOS PRODUCTOS DEL CARRITO
cartsRouter.delete("/:cid", cartDeleteAll);

//ACTUALIZA QUANTITY
cartsRouter.put("/:cid/products/:pid", updatQuantity);

//ACTUALIZAR CARRITO
cartsRouter.put("/:cid", updatCart);

export default cartsRouter;
