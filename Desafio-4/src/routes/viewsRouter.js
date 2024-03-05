import { Router } from "express";
import fs from "fs";

const viewsRouter = Router();

const data = fs.readFileSync("./src/data/productos.json","utf-8")
const products = JSON.parse(data)

// Muestra los productos en home.handlebars
viewsRouter.get('/',(req,res)=>{
    
            res.render('home',{ products } );
    });

// Crea y muestra los productos en realTimeProducts
viewsRouter.get('/realTimeProducts', (req, res) => {

    res.render('realTimeProducts', { products });
});

export default viewsRouter