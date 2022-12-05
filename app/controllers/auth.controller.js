const db = require("../models");
var bcrypt = require("bcryptjs");
const { createError } = require("../utils/error");
var jwt = require("jsonwebtoken");
const { resFormat } = require("../utils/res.format");
const User = db.user;

// Create and Save a new Tutorial
exports.login = async (req, res, next) => {
	const email = req.body.email;

	let user = await User.findOne({ where: { email: email } });
	if (!user || !user.id) return next(createError(404, "User nof found!"));

	const isPasswordCorrect = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!isPasswordCorrect)
		return next(createError(400, "Wrong password or username!"));

	const token = jwt.sign(
		{ id: user.id, isAdmin: user.is_admin },
		process.env.JWT
	);

	delete user.dataValues.password;
	res
		.cookie("access_token", token, {
			httpOnly: true,
		})
		.status(200)
		.json(resFormat(user, 200, "Login successfully", token));
};

exports.register = async (req, res, next) => {
	const tempUser = await User.findOne({ where: { email: req.body.email } });
	if (tempUser) return next(createError(403, "Email already sign up "));

	const salt = bcrypt.genSaltSync(10);
	req.body.password = bcrypt.hashSync(req.body.password, salt);

	const user = await User.create(req.body);
	res.status(200).send(user);
};
