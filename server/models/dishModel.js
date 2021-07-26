const mongoose = require("mongoose");
const { Schema } = mongoose;

const dish = new Schema({
	dishName: {
		type: String,
		required: true,
	},
	sellers: [
		{
			type: Schema.types.ObjectId,
			ref: "Seller",
		},
	],
});

module.exports = mongoose.model("Dish", dish);
