const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URL = process.env.MONGO_URI;

module.exports = {
	db: async () => {
		try {
			await mongoose.connect(URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			});
			console.log("db connected");
		} catch (err) {
			console.log("error: ", err);
		}
	},
	close: () => {
		mongoose.connection.close();
		console.log("db is closed");
	},
};
