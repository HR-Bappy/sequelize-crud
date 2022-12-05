const express = require('express');
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();

const productController = require("../controllers/product.controller.js");

router.get("/", (req, res) => {
	res.send("hellojggggs");
});
router.post("/create", verifyAdmin, productController.create);
router.get("/list", productController.findAll);
router.get("/findById/:id", productController.findOne);
router.put("/update/:id", verifyAdmin, productController.update);
router.get('/published', productController.publishedProducts)

module.exports = router;