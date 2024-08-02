import CartManager from "../dao/dbManagers/cartManager.js"
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
    

/*PUT POR HACER...
PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
//NOTA DEL PROFESOR:
el put recibe un array de productos, entonces seria reemplazar/actualizar lo que esta con el nuevo array de productos con el formato que tenemos que quiere decir: id y quantity. El router recibe el cid por param y toda la data nueva por body. En general esta muy completo el desafio, felicidades por la entrega.

cartsRouter.put("/:cid", async (req,res)=> {

    let cid = req.params.cid
})
*/

export default cartsRouter