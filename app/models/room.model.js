module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define("rooms", {
		title: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		features: {
			type: Sequelize.STRING,
		},
		hotel_id: {
			type: Sequelize.INTEGER,
		},
		price: {
			type: Sequelize.DOUBLE,
		},
		is_available: {
			type: Sequelize.BOOLEAN,
		},
	});

	return Room;
};
