const db = require("../models");
const { createError } = require("../utils/error");
const { resFormat } = require("../utils/res.format");
const Products = db.product;

// Create and Save a new Product
exports.create = async (req, res, next) => {
	if (!req.body.title) return next(createError(500, "Title can not be empty"));

	const productInfo = {
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
		published: req?.body?.published ? req.body.published : false,
	};

	const product = await Products.create(productInfo);
	res.status(200).send(resFormat(product, 200, "Product created successfully"));
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
	const products = await Products.findAll();
	res.status(200).send(resFormat(products, 200, "Get product list"));
};

// Find a single Product with an id
exports.findOne = async (req, res) => {
	const id = req.params.id;
	if (!id) return next(createError(404, "User not found!"));

	const product = await Products.findOne({ where: { id: id } });
	res.status(200).send(resFormat(product, 200, "Get Product"));
};

// Update a Product by the id in the request
exports.update = async (req, res) => {
	console.log(req.body);
	const id = req.params.id;

	const product = await Products.update(req.body, {
		where: { id: id },
	});
	console.log("object", product);
	res
		.status(200)
		.send(resFormat(req.body, 200, "Product updated successfully"));
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
	const id = req.params.id;

	await Product.destroy({ where: { id: id } });

	req.status(200).send(resFormat([], 200, "Product deleted successfully"));
};

// find all published Product
exports.publishedProducts = async (req, res) => {
	const products = await Products.findAll({ where: { published: true } });
	res.status(200).send(resFormat(products, 200, "Published Product list"));
};