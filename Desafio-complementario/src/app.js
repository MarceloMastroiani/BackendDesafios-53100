import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import ProductManager from "./dao/dbManagers/productManager.js";
import messagesModel from "./dao/models/messages.js";

import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from "./utils.js";



const app = express()
const PORT = process.env.PORT || 8080
const productManager = new ProductManager()


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


const connectMongoDB = async ()=> {
    
    const DB_URL = 'mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority'
    
    try{

        await mongoose.connect(DB_URL) 
        console.log("Conectado con Mongoose")

    }catch(error){

        console.log("No se pudo conectar a la DB",error)
        process.exit()
    }
}

connectMongoDB()

const server = app.listen(PORT,()=> console.log("Servidor corriendo en el puerto ", PORT))
const io = new Server(server)//instanciando socket.io

io.on("connection", async (socket) =>{

    console.log("Connected!")


    //ELIMINA EL PRODUCTO
    socket.on("delete product",async ({id})=>{
        await productManager.deleteProduct(id)
        const products = await productManager.getAll();
        io.emit("list updated", {products: products})
    })


  //CHAT
  const messages = await messagesModel.find().lean()
  socket.emit("chat messages", {messages})

  socket.on("new message", async (messageData)=>{
      await messagesModel.create(messageData)
      const messages = await messagesModel.find().lean()
      io.emit("chat messages", {messages})
  }) 


    socket.on("disconnect", () => {
        console.log("Socket desconectado");
      });
})