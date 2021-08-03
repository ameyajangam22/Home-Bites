const mongoose = require("mongoose");
const { Schema } = mongoose;

const order = new Schema({
	customerID: {
		type: String,
	},
	customerName: {
		type: String,
	},
	customerAddr: {
		type: String,
	},
	customerPhone: {
		type: String,
	},
	sellerId: {
		type: String,
	},
	dishes: [],
});

module.exports = mongoose.model("Order", order);
