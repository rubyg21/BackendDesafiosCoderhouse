const express = require('express')
const app = express()

const ProductManager = require('./productManager')
const manager = new ProductManager()


const run = async () => {
    
    app.get('/products', async (req, res) => {
        try {
            const allProducts = await manager.getProducts()
            const { limit } = req.query
            const products = allProducts.slice(0, Number(limit))
    
            if (!limit || Number(limit) < 1) {
                return res.send(allProducts)
            } else {
                return res.send(products)
            }
        } catch (error) {
            console.log(error);
        }
    })

    app.get('/products/:id', async (req, res) => {
        try {
            const {id: paramID} = req.params
            const id = Number(paramID)
            if (id < 0) {
                return res.send('Id must be a valid number')
            }
            const productFound = await manager.getProductByID(id)
            if (!productFound) {
                return res.send('Product not found')
            }
            return res.send(productFound)
        } catch (error) {
            console.log(error);
            return res.send('There is an error')
        }
    })
}

run()

app.listen(8080, () => {
    console.log('Server running and listening port 8080');
})