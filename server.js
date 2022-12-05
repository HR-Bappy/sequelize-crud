const express = require("express");
const cors = require("cors");
const productRouter = require('./app/routes/product.routes')
const authRouter = require('./app/routes/auth.routes')
const hotelRouter = require("./app/routes/hotel.routes");
const roomRouter = require("./app/routes/room.routes");
require("dotenv").config();

const app = express();

var corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize
	.sync()
	.then(() => {
		console.log("Synced db.");
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

// simple route
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hotel", hotelRouter);
app.use("/api/v1/room", roomRouter);








app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong";

	return res.status(500).json({
		success: false,
		status:errorStatus,
		message: errorMessage,
		stack: err.stack,
	})
})



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
