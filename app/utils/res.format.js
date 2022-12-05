exports.resFormat = (data, status, message, token = "") => {
	let tempData = {
		body: { data: data },
		status: status,
		message: message,
		timestamp: Date.now(),
	};
	if (token) tempData.header = { token: token };

	return tempData;
};
