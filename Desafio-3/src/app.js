import express from "express";
import ProductManager from "./productManager.js";


const app = express()
const port = 3000

//Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const testing = new ProductManager
const produ = testing.getProducts()


// Reduce los producto al limite deseado, si no se le manda limite carga todos los productos 
app.get('/products', async (req, res) => {

    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await produ)

    let getProduLim = await produ
    let produLim = getProduLim.slice(0, limit)
    res.send(produLim)
})



// Devolver sólo el producto solicitado por ID
app.get('/products/:pid',async (req, res) => {

    let pid = req.params.pid
    let getProduID = await produ

    let data = await getProduID.find((prod) => (prod.id == pid))
    if(!data) res.send('El ID no existe')

    res.send(data)
})


app.listen(port, () => console.log("Server corriendo en el puerto", port))


