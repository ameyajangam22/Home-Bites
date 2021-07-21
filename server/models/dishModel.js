const mongoose = require("mongoose");
const { Schema } = mongoose;

const dish = new Schema({
	dishName: {
		type: String,
		required: true,
	},
	dishPrice: {
		type: Number,
		required: true,
	},
	dishTags: [
		{
			tag: String,
		},
	],
	dishPic: {
		type: String,
	},
});

module.exports = mongoose.model("Dish", dish);
