const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");
const mongoose = require("mongoose");
const cloudinary = require("../../utils/cloudinary");
/// CATEGORY ROUTES
router.get("/getCategories", (req, res) => {
	Seller.find({ _id: req.session.seller._id }, (error, doc) => {
		//
		res.json({ info: doc[0].menu });
	});
});
router.post("/addCategory", upload.none(), (req, res) => {
	let categoryName = req.body.categoryName;
	const sellerId = req.session.seller._id;
	categoryName = categoryName.trim();
	Seller.findOneAndUpdate(
		{ _id: sellerId },
		{
			$push: { menu: { categoryName: categoryName, dishes: [] } },
		},
		(error, doc) => {
			if (error) {
			} else {
				res.send("ok");
			}
		}
	);
});
router.post("/deleteCategory", upload.none(), (req, res) => {
	const categoryName = req.body.categoryName;
	const sellerId = req.session.seller._id;
	let dishes = req.body.dishes;
	dishes = dishes.split(",");
	dishes.forEach(async (dish) => {
		let rep = await cloudinary.uploader.destroy(dish);
	});
	Seller.findOneAndUpdate(
		{ _id: sellerId },
		{
			$pull: { menu: { categoryName: categoryName } },
		},
		(error, doc) => {
			if (error) {
			} else {
				//
				res.send("ok");
			}
		}
	);
});
//DISH ROUTES
router.post("/addDish", upload.none(), (req, res) => {
	let foodName = req.body.foodName;
	foodName = foodName.trim();
	const foodPrice = req.body.foodPrice;
	let isVeg = req.body.isVeg;
	const categoryName = req.body.categoryName;
	if (isVeg == "veg") {
		isVeg = true;
	} else {
		isVeg = false;
	}
	Seller.findOneAndUpdate(
		{
			_id: req.session.seller._id,
			menu: {
				$elemMatch: {
					categoryName: categoryName,
				},
			},
		},
		{
			$push: {
				"menu.$.dishes": {
					foodName: foodName,
					foodPrice: foodPrice,
					isVeg: isVeg,
					foodPicUrl: req.body.foodPicUrl,
					dishCloudinaryId: req.body.dishCloudinaryId,
				},
			},
		},
		(error, doc) => {
			if (error) {
			} else {
				res.send("ok");
			}
		}
	);
});
router.post("/deleteDish", upload.none(), async (req, res) => {
	const categoryName = req.body.categoryName;
	const dishId = req.body.dishId;
	const sellerId = req.session.seller._id;
	const dishCloudinaryId = req.body.dishCloudinaryId;

	const remPic = await cloudinary.uploader.destroy(dishCloudinaryId);
	Seller.findOneAndUpdate(
		{
			_id: sellerId,
			menu: {
				$elemMatch: {
					categoryName: categoryName,
				},
			},
		},
		{
			$pull: {
				"menu.$.dishes": {
					_id: mongoose.Types.ObjectId(dishId),
				},
			},
		},
		(error, doc) => {
			if (error) {
			} else {
				res.send("Dish deleted successfully");
			}
		}
	);
});

// MISCELLANEOUS
router.post("/updateTwoPrice", (req, res) => {
	const price = req.body.twoPrice;
	const sellerId = req.session.seller._id;
	Seller.findOneAndUpdate(
		{ _id: sellerId },
		{ $set: { costForTwo: price } },
		{ new: true },
		(error, doc) => {
			if (error) {
				throw error;
			} else {
				req.session.seller.costForTwo = price;
				res.json(doc);
			}
		}
	);
});
module.exports = router;
