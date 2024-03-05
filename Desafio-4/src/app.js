import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import viewsRouter from "./routes/viewsRouter.js"

import express from "express";
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from "./utils.js";



const app = express()
const port = 8080


//Middlewares

app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.engine('handlebars', handlebars.engine())


//Rutas
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter )
app.use("/",viewsRouter)


const server =app.listen(port,console.log("Servidor corriendo en el puerto " + port))
const io = new Server(server)//instanciando socket.io

io.on('connection', socket =>{

    console.log("Connected!")

    socket.on("message", (data)=> {
    console.log(data)
    })
})