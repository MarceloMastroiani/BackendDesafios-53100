import ProductManager from "../dao/dbManagers/productManager.js"
import express  from "express"
import productsModel from "../dao/models/products.js"


const productManager = new ProductManager()
const productsRouter = express.Router()

//MUESTRA LOS PRODUCTOS AGREGANDO QUERY
productsRouter.get('/', async (req,res)=>{
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;
    let sort = parseInt(req.query.sort);
    let filt = {}
    let status = 'success';
  
    try {
        if (req.query.query){
            filt = {
                $or: [{description:req.query.query }, {category: req.query.query} ]
            }
        }

        console.log(filt)
        console.log(req.query)
        console.log(req.query.query)


        let sortPrice = {}
        if (sort) {
            sortPrice = { price: sort };
        }

        let result = await productsModel.paginate(filt, { limit: limit, page: page, sort: sortPrice, lean: true });

        const paginateData = {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${result.limit}&sort=${result.sort}` : null,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${result.limit}&sort=${result.sort}` : null
        };

        res.send(paginateData);

    } catch (error) {
        status = 'error';
        res.status(500).send({ status, error: error.message });
    }
});

//MUESTRA LOS PRODUCTOS //
productsRouter.get("/all", async (req,res)=> {
    let limit = req.query

    let data = await productManager.getAll(limit)
    res.json({data})
})

//BUSCAR POR ID
productsRouter.get("/:id", async (req,res)=> {
    let id = req.params.id

    let result = await productManager.getById(id)
    res.json({result})
})

//ENCUENTRA EL PRODUCTO POR EL BRAND
productsRouter.get("/:bran", async (req,res)=> {
    let brand = req.params.brand

    let result = await productManager.getByBrand(brand)
    res.json({result})
})

//AGREGA UN PRODUCTO
productsRouter.post("/add", async (req,res)=> {
    const newProduct = req.body

    let result = await productManager.addProduct(newProduct)
    res.json({result})
})

//EDITAR UN PRODUCTO
productsRouter.put("/edit/:id", async (req,res)=> {
    let id = req.params.id
    let productData = req.body

    let result = await productManager.updateProduct(id, productData)
    res.json({result})
})

//ELIMINAR UN PRODUCTO
productsRouter.delete("/delete/:id", async (req,res)=> {
    let id = req.params.id

    let result = await productManager.deleteProduct(id)
    res.json({result})
})

export default productsRouter