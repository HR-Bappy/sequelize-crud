var jwt = require("jsonwebtoken");

const { createError } = require("./error.js");

const verifyToken = (req, res, next) => {
	let token = req?.headers?.access_token || "";

	if (!token) return next(createError(401, "You are not authenticated!"));

	let temp = token.split(" ");
	token = temp[1];
	jwt.verify(token, process.env.JWT, (err, user) => {
		if (err) return next(createError(403, "Token in not valid!"));
		req.user = user;
		next();
	});
};

const verifyUser = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) next();
		else return next(createError(403, "You are not authenticated!"));
	});
};

const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		console.log("req.user", req.user);
		if (req?.user?.isAdmin) next();
		else return next(createError(403, "You are not allow!"));
	});
};

module.exports = { verifyUser, verifyAdmin, verifyToken };
