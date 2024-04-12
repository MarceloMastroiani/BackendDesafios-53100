import express from "express";
import ProductManager from "../dao/dbManagers/productManager.js"

const productManager = new ProductManager()

const viewsRouter = express.Router();

// Muestra los productos en home.handlebars
viewsRouter.get('/', async (req,res)=>{
    
    let product = await productManager.getAll()
    res.render('home',{product});
});

// Crea y muestra los productos en realTimeProducts
viewsRouter.get('/realTimeProducts', async (req, res) => {

    let product = await productManager.getAll()
    res.render('realTimeProducts', {product});
});

viewsRouter.get('/chat',(req,res)=>{
    res.render('chat',{});
})


export default viewsRouter