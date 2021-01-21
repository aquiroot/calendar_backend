const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		console.log('DB online');
	} catch (error) {
		console.log(error);
		throw new error('Error de acceso a base de datos');
	}
};

module.exports = {
	dbConnection,
};
