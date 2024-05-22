import cartModel from "../models/carts.js";

export default class Cart {
  constructor() {
    console.log("Trabajando con cart.dao");
  }

  getCartById = async (id) => {
    let result = await cartModel.findById(id).lean();
    return result;
  };
  getCartLean = async (id) => {
    let result = await cartModel.find({ _id: id }).lean();
    return result;
  };
  createCart = async () => {
    let result = await cartModel.create({});
    return result;
  };
  addProduct = async (cartId, productId, quantity) => {
    const cart = await cartModel.findById(cartId);
    console.log(cart);

    const productIndex = cart.products.findIndex(
      (item) => item.product._id.toString() === productId.toString()
    );

    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity });
    } else {
      throw new Error("El producto ya existe en el carrito.");
    }
    return await cart.save();
  };
  deleteProduct = async (cid, pid) => {
    let cart = await cartModel.findById(cid);
    let product = cart.products.filter((p) => p.product !== pid);

    if (product === 0) {
      console.log("Producto no encontrado");
    } else {
      cart.products.splice(product, 1);
    }

    return await cart.save();
  };
  deleteAll = async (cid) => {
    const cart = await cartModel.findById(cid);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.products = [];

    return await cart.save();
  };
  updateQuantity = async (cid, pid, newProductQuantity) => {
    let cart = await this.getCartById(cid);

    let index = cart.products.findIndex((p) => p.product._id.toString() == pid);

    if (index >= 0) {
      cart.products[index].quantity = newProductQuantity;
    } else {
      console.error("Hubo un error al actualizar la cantidad del producto");
    }

    let result = cartModel.updateOne({ _id: cid }, cart);
    return result;
  };
  updateCart = async (cid, productList) => {
    const cart = await this.getCartById(cid);
    productList.forEach((pl) => {
      const index = cart.products.findIndex(
        (p) => p.product._id.toString() == pl.product
      );

      if (index >= 0) {
        cart.products[index].quantity += pl.quantity;
      } else {
        cart.products.push({ product: pl.product, quantity: pl.quantity });
      }
    });
    await cartModel.updateOne({ _id: cid }, cart);
  };
}
