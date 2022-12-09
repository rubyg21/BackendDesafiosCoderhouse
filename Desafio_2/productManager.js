const fs = require('fs')

class ProductManager {

    constructor() {
        this.path = './products.json'
    }

    read = async () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, 'utf-8')
                .then(r => JSON.parse(r))
        } else {
            return []
        } 
    }

    write = (productsList) => {
        return fs.promises.writeFile(this.path, JSON.stringify(productsList))
    }

    getProducts = async () => {
        const data = await this.read()
        return data
    }

    getNextID = (productsList) => {
        const count = productsList.length
        return (count > 0) ? productsList[count-1].id + 1 : 1
    }

    addProduct = async (product) => {
        const productsList = await this.read()
        product.id = this.getNextID(productsList)

        const codeChecked = productsList.find((p) => p.code === product.code)

        if (!codeChecked) {
            productsList.push(product)
            await this.write(productsList)
        } else {
            console.log('This product has already been added');
        }
    }

    getProductByID = async (id) => {
        const productsList = await this.read()
        const product = productsList.find((product) => id == product.id)

        if (product) {
            return product;
        } else {
            console.log('Not found');
        }
    }

    updateProduct = async (id, product) => {
        product.id = id
        const productsList = await this.read()

        const index = productsList.findIndex(e => e.id == id)
        if (index < 0) {
            return
        } else {
            productsList[index] = product
        }

        await this.write(productsList)
    }

    deleteProduct = async (id) => {
        const productsList = await this.read()
        
        const productsFiltered = productsList.filter((product) => id != product.id)

        if (!productsFiltered) {
            await this.write(productsFiltered)
            console.log('Product deleted');
        } else {
            console.log('There is no product with this ID');
        }

    }
}

module.exports = ProductManager