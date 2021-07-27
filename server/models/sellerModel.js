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
			categoryName: {
				type: String,
				default: "New Course",
			},
			dishes: [
				{
					// type: Schema.Types.ObjectId,
					// ref: "Dish",
					foodName: {
						type: String,
					},
					foodPrice: {
						type: Number,
					},
					isVeg: {
						type: Boolean,
					},
				},
			],
		},
	],
});

module.exports = mongoose.model("Seller", seller);
