const express = require('express');
const router = express.Router()

const productController = require('../controllers/product.controller.js')

router.get('/', (req,res) => {
  res.send("hellojggggs")
})
router.post('/create', productController.create)
router.get('/list', productController.findAll)
router.get('findById/:id', productController.findOne)
router.put('/update/:id', productController.update)
router.get('/published', productController.publishedProducts)

module.exports = router;