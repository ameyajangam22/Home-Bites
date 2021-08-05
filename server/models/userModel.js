const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
	email: {
		type: String,
		required: true,
	},
	googleID: {
		type: String,
		required: true,
	},
	username: String,
	displayName: String,
	phoneNo: Number,
	orders: [
		{
			order_id: {
				type: String,
			},
			dishPic: {
				type: String,
			},
			restaurantName: {
				type: String,
			},
			quantity: {
				type: Number,
			},
			dishName: {
				type: String,
			},
			dishPrice: {
				type: Number,
			},
			created_at: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = mongoose.model("User", user);
