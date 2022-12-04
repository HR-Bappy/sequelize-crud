const db = require("../models");
const { createError } = require("../utils/error");
const Products = db.product


// Create and Save a new Tutorial
exports.create = async (req, res, next) => {
  if(!req.body.title)return next(createError(500, "Title can not be empty"));

  const productInfo = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req?.body?.published ? req.body.published : false,
  }

    const product = await Products.create(productInfo)
    res.status(200).send(product)

};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    const products = await Products.findAll()
    res.status(200).send(products)
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  if(!id) return next(createError(404, "User not found!"))
 
    const product = await Products.findOne({where:{id:id}})
    res.status(200).send(product)
  
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;

  const product = await Products.update(req.body, {where:{id:id}})
  console.log('object',product);
  res.status(200).send({message:'Successfully Updated....'})
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

	await Product.destroy({ where: { id: id } });

	req.status(200).send("Deleted successfully");
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// find all published Tutorial
exports.publishedProducts  = async (req, res) => {
  const products = await Products.findAll({where:{published:true}})
  res.status(200).send(products)
};