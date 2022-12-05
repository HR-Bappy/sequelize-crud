module.exports = (sequelize, Sequelize) => {
	const Hotel = sequelize.define("hotel", {
		title: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		address: {
			type: Sequelize.BOOLEAN,
		},
		rating: {
			type: Sequelize.INTEGER,
		},
		city: {
			type: Sequelize.STRING,
		},
		room_ids: [],
	});

	return Hotel;
};
