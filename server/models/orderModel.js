const mongoose = require("mongoose");
const { Schema } = mongoose;

const order = new Schema({
	order_id: {
		type: String,
	},
	sellerRestaurant: {
		type: String,
	},
	userEmail: {
		type: String,
	},
	customerAddr: {
		type: String,
	},
	customerName: {
		type: String,
	},
	customerPhone: {
		type: String,
	},
	dishPic: {
		type: String,
	},
	dishName: {
		type: String,
	},
	quantity: {
		type: Number,
	},
	dishPrice: {
		type: Number,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	dispatched: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Order", order);
