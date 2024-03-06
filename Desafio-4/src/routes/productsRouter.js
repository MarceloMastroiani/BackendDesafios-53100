import { Router } from "express";
import fs from "fs"

const productsRouter = Router()
const pathProduct = "./src/data/productos.json"



// (GET) TRAE TODOS LOS PRODUCTOS // 
productsRouter.get("/", (req,res) => {

    const produRead = fs.readFileSync(pathProduct, "utf-8")
    const parsedProduct = JSON.parse(produRead)

    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(parsedProduct)

    let getProduLim = parsedProduct
    let produLim = getProduLim.slice(0, limit)

    res.json(produLim)


})

// (GET) TRAE EL PRODUCTO QUE COINSIDA CON EL ID //
productsRouter.get("/:pid", (req,res) => {

    const pdi = parseInt(req.params.pid)
    const produRead = fs.readFileSync(pathProduct, "utf-8")
    const parsedProduct = JSON.parse(produRead)

    const productId = parsedProduct.find((produ) => produ.id === pdi)
    
    res.send(productId)

})

// (POST) CREAR UN PRODUCTO //
productsRouter.post("/", (req,res) => {
console.log('entroooo')
    const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails } = req.body

    const produRead = fs.readFileSync(pathProduct, "utf-8")
    const parsedProduct = JSON.parse(produRead)

    const productNew = {

        id:parsedProduct.length + 1,
        title,
        description,
        code,
        price,
        status:true,
        stock,
        category,
        thumbnails
    }

    parsedProduct.push(productNew)
    let data = JSON.stringify(parsedProduct)
    fs.writeFileSync(pathProduct, data, null)

    res.send('Produto agregado')
})

// (PUT) TOMA UN PRODUCTO Y LO ACTUALIZA //
productsRouter.put("/:pid", (req,res) => {

    const pdi = parseInt(req.params.pid)
    const produBody = req.body

    const produRead = fs.readFileSync(pathProduct, "utf-8")
    let parsedProduct = JSON.parse(produRead)

    const index = parsedProduct.findIndex((prod) => prod.id === pdi);
    const produUpdate = {

        ...parsedProduct[index],
        ...produBody
    }

    parsedProduct[index] = produUpdate


    let data = JSON.stringify(parsedProduct)
    fs.writeFileSync(pathProduct, data, null)

    res.send('Se actualizo con exito')

})

//(DELETE) ELIMINA EL PRODUCTO //
productsRouter.delete("/:pid", (req,res) => {

    const pid = req.params.pid

    const produRead = fs.readFileSync(pathProduct, "utf-8")
    const parsedProduct = JSON.parse(produRead)

    const produDelete = parsedProduct.filter(produc => produc.id != pid)

    let data = JSON.stringify(produDelete)
    fs.writeFileSync(pathProduct, data, null)

    res.send('se elimino el producto')

})


export default productsRouter