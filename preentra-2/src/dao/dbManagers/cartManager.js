import cartModel from "../models/carts.js"


export default class CartsManager {

    constructor(){
        console.log("Trabajando con cartManager")
    }

getCartById = async (id) => {
        let result = await cartModel.findById(id)
        return result
        }
getCartLean = async  (id) => {
        let result = await cartModel.find({_id: id}).lean()
        return result;
        }
createCart = async () => {
        let result = await cartModel.create({})
        return result
        }
addProduct = async (cid, pid, quantity) => {
        let cart = await cartModel.findById(cid)
        let product = cart.products.find((product) => product.product.toString() === pid)

        if (product) {
            product.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        return await cart.save();
        }
deleteProduct = async (cid, pid) => {
        let cart = await cartModel.findById(cid)
        let product = cart.products.filter(p => p.product !== pid);

        if(product === 0){
            console.log("Producto no encontrado")
        }else{
            cart.products.splice(product,1)
        }

        return await cart.save();
        }
deleteAll = async (cid) => {
        
            const cart = await cartModel.findById(cid);
    
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.products = [];
    
            return await cart.save();
        }
updateQuantity = async  (cid, pid, newProductQuantity) => {
            let cart = await this.getCartById(cid)

            let index = cart.products.findIndex(p =>p.product._id.toString() == pid)

            if(index >= 0) {
                cart.products[index].quantity = newProductQuantity;  
            }else{
                console.error('Hubo un error al actualizar la cantidad del producto')
            }

            let result = cartModel.updateOne({_id: cid}, cart);   
            return result    
        }
}
