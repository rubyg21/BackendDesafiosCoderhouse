const ProductManager = require('./productManager')

const manager = new ProductManager()

const run = async () => {
    
    await manager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock:25
    })

    await manager.addProduct({
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "def345",
        stock:25
    })

    console.log(await manager.getProducts()); //devuelve array con los dos productos
    console.log(await manager.getProductByID(1)); //devuelve el producto con id 1

    await manager.updateProduct(2, {
        title: "segundo producto de prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "def345",
        stock:25
    })

    console.log(await manager.getProducts()); //devuelve array con el producto con id 2 actualizado
    console.log(await manager.deleteProduct(2)); //elimina el producto con id 2
    console.log(await manager.getProducts()); //devulve array sin el producto con id 2
}

run()