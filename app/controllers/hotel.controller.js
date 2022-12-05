const db = require("../models");
const { createError } = require("../utils/error");
const { resFormat } = require("../utils/res.format");
const Hotel = db.hotel;

// CREATE
exports.create = async (req, res, next) => {
	const hotel = await Hotel.create(req.body);
	res.status(200).send(resFormat(hotel, 200, "Hotel created successfully"));
};

// GET ALL
exports.findAll = async (req, res) => {
	const hotels = await Hotel.findAll();
	res.status(200).send(resFormat(hotels, 200, "Get hotel list"));
};

// GET BY ID
exports.findOne = async (req, res) => {
	const id = req.params.id;
	if (!id) return next(createError(404, "Room not found!"));

	const hotel = await Hotel.findOne({ where: { id: id } });
	res.status(200).send(resFormat(hotel, 200, "Get Hotel"));
};

// UPDATE
exports.update = async (req, res) => {
	console.log(req.body);
	const id = req.params.id;

	const hotel = await Hotel.update(req.body, {
		where: { id: id },
	});
	res.status(200).send(resFormat(hotel, 200, "Hotel updated successfully"));
};

// DELETE
exports.delete = async (req, res) => {
	const id = req.params.id;

	await Hotel.destroy({ where: { id: id } });

	req.status(200).send(resFormat([], 200, "Hotel deleted successfully"));
};
