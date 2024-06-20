import express from "express";
import {
  getProduct,
  getAllProduct,
  getByIdd,
  getByBrands,
  addProd,
  updateProd,
  deleteProdu,
} from "../controllers/products.controller.js";

const productsRouter = express.Router();

//MUESTRA LOS PRODUCTOS AGREGANDO QUERY
productsRouter.get("/", getProduct);

//MUESTRA LOS PRODUCTOS //
productsRouter.get("/all", getAllProduct);

//BUSCAR POR ID
productsRouter.get("/:id", getByIdd);

//ENCUENTRA EL PRODUCTO POR EL BRAND
productsRouter.get("/:bran", getByBrands);

//AGREGA UN PRODUCTO
productsRouter.post("/add", addProd);

//EDITAR UN PRODUCTO
productsRouter.put("/edit/:id", updateProd); //checkRole("admin"),

//ELIMINAR UN PRODUCTO
productsRouter.delete("/delete/:id", deleteProdu); //checkRole("admin"),

export default productsRouter;

// /api/products/delete/66184c198c1f084f0077c45b
// /api/products/delete/6671bcbbf76febf469a34a9a
