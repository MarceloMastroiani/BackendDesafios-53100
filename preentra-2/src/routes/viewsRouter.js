import express from "express";
import ProductManager from "../dao/dbManagers/productManager.js"
import CartsManager from "../dao/dbManagers/cartManager.js";
import productsModel from "../dao/models/products.js";
import cartsModel from "../dao/models/carts.js";

const cartsManager = new CartsManager()
const productManager = new ProductManager()
const viewsRouter = express.Router();

//MUESTRA LOS PRODUCTOS EN home.handlebars
viewsRouter.get('/', async (req,res)=>{
    let product = await productManager.getAll()
    res.render('home',{product});
});

//CREA Y MUESTRA LOS PRODUCTOS EN realTimeProducts
viewsRouter.get('/realTimeProducts', async (req, res) => {
    let product = await productManager.getAll()
    res.render('realTimeProducts', {product});
});

//REMDERIZA EL CHAT
viewsRouter.get('/chat',(req,res)=>{
    res.render('chat',{});
})

//RENDERIZA UNA VISTA PRODUCTS
viewsRouter.get('/products', async (req,res)=>{
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;
    let sort = parseInt(req.query.sort);
    let filt = {}

        if (req.query.query){
            filt = {
                $or: [{description:req.query.query }, {category: req.query.query} ]
            }
        }

        let sortPrice = {}
        if (sort) {
            sortPrice = { price: sort };
        }

        const result = await productsModel.paginate(filt, { limit , page, sort: sortPrice, lean: true });

        result.isValid = page >= 1 && page <= result.totalPages;

        result.nextLink = result.hasNextPage
          ? `http://localhost:8080/products?limit=${result.limit}&page=${result.nextPage}&sort=${result.sort}`
          : "";
        result.prevLink = result.hasPrevPage
          ? `http://localhost:8080/products?limit=${result.limit}&page=${result.prevPage}&sort=${result.sort}`
          : "";

        res.render("product",result)
    
})
    
//RENDERIZA LA VISTA DEL CARRITO
viewsRouter.get('/carts/:cid', async (req,res)=>{
    let cid = req.params.cid

    const result = await cartsManager.getCartLean(cid)
    console.log({result})
    res.render("cart", {result} )
})

export default viewsRouter