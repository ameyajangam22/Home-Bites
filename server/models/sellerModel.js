const mongoose = require("mongoose");
const { Schema } = mongoose;

const seller = new Schema({
	sellerName: {
		type: String,
		required: true,
	},
	sellerEmail: {
		type: String,
		required: true,
		unique: true,
	},
	sellerPassword: {
		type: String,
		required: true,
	},
	restaurantName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	restaurantPic: {
		type: String,
	},
	cloudinaryId: {
		type: String,
	},
	menu: [
		{
			category: {
				categoryName: {
					type: String,
					default: "New Course",
				},
				dishes: [
					{
						type: Schema.Types.ObjectId,
						ref: "Dish",
					},
				],
			},
		},
	],
});

module.exports = mongoose.model("Seller", seller);
