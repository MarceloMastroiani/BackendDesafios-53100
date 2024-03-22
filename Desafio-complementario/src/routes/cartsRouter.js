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

//
cartsRouter.delete("/delete/:cid/:pid", async (req,res)=> {
    let cid = req.params.cid
    let pid = req.params.pid

    let result = await cartManager.deleteProduct(cid,pid)
    res.json({result})
})

export default cartsRouter

/* ROUTER ANTERIOR
import { Router } from "express";
import fs from "fs"

const cartsRouter = Router()
const pathCart = "./data/carrito.json"

// (POST) CREA UN NUEVO CARRITO //
cartsRouter.post("/", (req,res) => {

    const cartRead = fs.readFileSync(pathCart, 'utf-8')
    const parsedCart = JSON.parse(cartRead)

    let cartNew = {

        id:parsedCart.length + 1,
        products: []

    }

    parsedCart.push(cartNew)
    let data = JSON.stringify(parsedCart)
    fs.writeFileSync(pathCart, data, null)

    res.send("carrito creado")

})

// (GET) MUESTRA LOS PRODUCTOS DEL CARRITO SEGUN SU ID //
cartsRouter.get("/:cid", (req,res) => {

    const cid = parseInt(req.params.cid)
    const cartRead = fs.readFileSync(pathCart, 'utf-8')
    const parsedCart = JSON.parse(cartRead)

    const cartView = parsedCart.find((cart) => cart.id === cid)
    const data = JSON.stringify(cartView)

    res.send(data)

})





// (POST) AGREGA PRODUCTOS NUEVOS AL CARRITO SELECCIONADO //

// HACER CAMBIOS //
cartsRouter.post("/:cid/product/:pid", (req,res) => {

    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    const cartRead = fs.readFileSync(pathCart, "utf-8")
    const parsedCart = JSON.parse(cartRead)
    const { quantity } = req.body
  
    const foundCart = parsedCart.find((item) => (item.id) === cid)
    
    const foundProduct = foundCart.products.find((produ) => produ.product === pid)

    const getProduct = {

        product: pid,
        quantity: parseInt(quantity)
    }

// !foundProduct
    if (foundProduct !== undefined) {

        foundCart.products[pid-1].quantity+= parseInt(quantity)

    } else {
       
        foundCart.products.push(getProduct)
        console.log("else")
    }

    let data = JSON.stringify(parsedCart)
    fs.writeFileSync(pathCart, data, null)

    res.send('Producto agregado al carrito')
    
})



export default cartsRouter 
*/