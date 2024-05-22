import { cartService } from "../repositories/index.js";

export const cartByIdd = async (req, res) => {
  let id = req.params.cid;

  let result = await cartService.getCartById(id);
  res.json({ result });
};

export const creatCart = async (req, res) => {
  let result = await cartService.createCart();

  res.json({ result });
};

export const cartAddProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body;
  const updatedCart = await cartService.addProduct(cid, pid, quantity);
  try {
    res.json({ status: "success", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const cartDeleteProduct = async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let result = await cartService.deleteProduct(cid, pid);

  res.send({ cart: result });
};

export const cartDeleteAll = async (req, res) => {
  let cid = req.params.cid;

  let result = await cartService.deleteAll(cid);
  res.send({ result });
};

export const updatQuantity = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const newProductQuantity = req.body.quantity;

  if (newProductQuantity) {
    const updatedQuantity = await cartService.updateQuantity(
      cid,
      pid,
      newProductQuantity
    );
    res.send({ updatedQuantity });
  } else {
    res.send("Hubo un error al actualizar la cantidad del producto");
  }
};

export const updatCart = async (req, res) => {
  const cid = req.params.cid;
  const productList = req.body;

  if (productList) {
    const updatedProducts = await cartService.updateCart(cid, productList);
    res.send(updatedProducts);
  } else {
    res.send("Carrito no encontrado");
  }
};
