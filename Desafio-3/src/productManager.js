
import fs from "fs" ;

export default class ProductManager {
    constructor(){

        this.path = "./prducts.json"
        this.currentId = 1
        this.products = []

    }

    addProduct = async(title, description, price, thumbnail,code, stock) => {


        const product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code:code,
            stock: stock,
            id: this.currentId++
          }

          this.products.push(product)

          await fs.promises.writeFile(this.path,JSON.stringify(this.products))
    }


    getProducts = async() => {
        let response =await fs.promises.readFile(this.path, "utf-8")                       
         return JSON.parse(response)
    }

    getProductById = async(id) =>{
        let response2 = await this.getProducts()
        if(response2.find(product => product.id  === id)){
            console.log(response2.find(product => product.id  === id))
        } else{
            console.log("product not found")
        }
    }

    updateProduct = async({ id, ...products }) =>{
        await this.deleteProduct(id)
        let prodRefresh = await this.getProducts()
        let prodModif = [{...products, id}, ...prodRefresh]
        await fs.promises.writeFile(this.path,JSON.stringify(prodModif))
    }

    deleteProduct = async(id) => {
        let response3 = await this.getProducts()
        let deleteID = response3.filter(products => products.id != id )

        await fs.promises.writeFile(this.path,JSON.stringify(deleteID))
        console.log("removed product")
    }
 }
  


// TESTING //

  
const testing = new ProductManager
    
    //testing.getProducts()

    // testing.addProduct('titilo1', 'descrip1', 1111, 'img1', 'abc1', 10)
    
    // testing.addProduct('titilo2', 'descrip2', 2222, 'img2', 'abc2', 20)
    // testing.addProduct('titilo3', 'descrip3', 3333, 'img3', 'abc3', 30)
   

    //testing.getProductById(2)
    
    /*
    testing.updateProduct(
        {
            title: 'titilo2',
            description: 'descrip2',
            price: 10000,
            thumbnail: 'img2',
            code: 'abc2',
            stock: 100,
            id: 2
        })
    */

   //testing.deleteProduct(3)