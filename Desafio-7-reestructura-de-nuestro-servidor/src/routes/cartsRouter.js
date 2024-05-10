import CartManager from "../controllers/cartManager.js"
import express  from "express"

const cartManager = new CartManager()
const cartsRouter = express.Router()

//MOSTRAR EL CARRITO POR ID
cartsRouter.get("/:cid", async (req,res)=> {
    let id = req.params.cid

    let result = await cartManager.getCartById(id)
    res.json({result})
})
//CREA UN NUEVO CARRITO
cartsRouter.post("/create", async (req,res)=> {
    let result = await cartManager.createCart()

    res.json({result})
})
//AGREGA UN PRODUCTO AL CARRITO
cartsRouter.post("/:cid/product/:pid", async (req,res)=> {
    let cid = req.params.cid
    let pid = req.params.pid
    let { quantity } = req.body
    
    let result = await cartManager.addProduct(cid, pid, quantity)
    res.json({result})
}) 
//ELIMINA EL PRODUCTO DEL CARRITO
cartsRouter.delete("/:cid/products/:pid", async (req,res)=> {
    let cid = req.params.cid
    let pid = req.params.pid

    let result = await cartManager.deleteProduct(cid,pid)

    res.send({cart: result });
})
//ELIMINA TODOS LOS PRODUCTOS DEL CARRITO
cartsRouter.delete("/:cid", async (req,res)=> {
    let cid = req.params.cid


        let result = await cartManager.deleteAll(cid);
        res.send({ result });

});
//ACTUALIZA QUANTITY
cartsRouter.put("/:cid/products/:pid", async (req,res)=> {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const newProductQuantity = req.body.quantity;
    
        if (newProductQuantity) {
            const updatedQuantity = await cartManager.updateQuantity(cid, pid, newProductQuantity)
            res.send({updatedQuantity});
        } else {
            res.send("Hubo un error al actualizar la cantidad del producto");
        }
});
//ACTUALIZAR CARRITO
cartsRouter.put('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const productList = req.body;
    
    if (productList) {
        const updatedProducts = await cartManager.updateCart(cid, productList);
        res.send(updatedProducts);
    } else {
        res.send('Carrito no encontrado');
    }
});

export default cartsRouter