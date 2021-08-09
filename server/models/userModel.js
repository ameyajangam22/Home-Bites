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
			type: Schema.Types.ObjectId,
			ref: "Order",
		},
	],
});

module.exports = mongoose.model("User", user);
