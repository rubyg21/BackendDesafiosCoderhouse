class ProductManager {

    constructor() {
        this.products = []
    }

    getProducts = () => {
        return this.products
    }

    getNextID = () => {
        const count = this.products.length

        const nextID = (count > 0) ? this.products[count-1].id + 1 : 1
        
        return nextID
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const id = this.getNextID()

        const codeChecked = this.products.find((product) => product.code === code)

        if (!codeChecked) {
            const product = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }
            this.products.push(product);
        } else {
            console.log('This product has already been added');
        }
    }

    getProductByID = (id) => {
        const product = this.products.find((product) => id == product.id)

        if (product) {
            return product;
        } else {
            console.log('Not found');
        }
    }

}

const manager = new ProductManager();

console.log(manager.getProducts()); //Devuelve array vacio de products

manager.addProduct('Test product', 'This is a test product', 200, 'No picture', 'abc123', 25)
manager.addProduct('Second test product', 'This is a second test product', 100, 'No picture', 'abc124', 25)

console.log(manager.getProducts()); //Devuelve el array con estos dos products agregados con sus respectivos IDs
manager.addProduct('Test product', 'This is a test product', 200, 'No picture', 'abc123', 25) //No agrega este product porque coincide el code
console.log(manager.getProductByID(2)) //Trae el product con ID 2
manager.getProductByID(9) //No encuentra product con este ID