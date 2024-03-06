const socket = io()



const createProduct = (products)=> {
    return `
        <ul>
            <li>Nombre: ${products.title}</li>
            <li>Descripcion: ${products.description}</li>
            <li>Codigo: ${products.code}</li>
            <li>Precio: $${products.price}</li>
            <li>Stock: ${products.stock}</li>
            <li>Categoria: ${products.category}</li>
            <li>${products.thumbnails}</li>
            <li>Estado:${products.status}</li>
             <li>ID: ${products.id}</li>
        </ul>
    `;
}

socket.on('productNew', (productNew) => {

    const productsList = document.querySelector('.productsList');
    productsList.innerHTML += createProduct(productNew);

})