const express = require("express");
const { verifyAdmin } = require("../utils/verifyToken.js");
const router = express.Router();

const hotelController = require("../controllers/hotel.controller.js");

router.get("/", (req, res) => {
	res.send("hellojggggs");
});
router.post("/create", verifyAdmin, hotelController.create);
// router.get("/list", productController.findAll);
// router.get("/findById/:id", productController.findOne);
// router.put("/update/:id", verifyAdmin, productController.update);

module.exports = router;
