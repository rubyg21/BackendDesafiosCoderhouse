import ProductManager from '../helpers/ProductManager.js'
import { Router } from 'express'
import express from 'express'

const router = express.Router()
let productosCargados = ProductManager.getProducts()

router.get('/', (req, res) => {
  res.render('home', {productosCargados})
})

export default router;
