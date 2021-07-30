const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");
const mongoose = require("mongoose");
/// CATEGORY ROUTES
router.get("/getCategories", (req, res) => {
	Seller.find({ _id: req.session.seller._id }, (error, doc) => {
		// console.log(doc[0].menu);
		res.json({ info: doc[0].menu });
	});
});
router.post("/addCategory", upload.none(), (req, res) => {
	let categoryName = req.body.categoryName;
	const sellerId = req.session.seller._id;
	categoryName = categoryName.trim();
	console.log(categoryName);
	Seller.findOneAndUpdate(
		{ _id: sellerId },
		{
			$push: { menu: { categoryName: categoryName, dishes: [] } },
		},
		(error, doc) => {
			if (error) {
				console.log("CategoryAdd ERR", error);
			} else {
				console.log("Successfully added category");
				res.send("ok");
			}
		}
	);
});
router.post("/deleteCategory", upload.none(), (req, res) => {
	const categoryName = req.body.categoryName;
	const sellerId = req.session.seller._id;
	Seller.findOneAndUpdate(
		{ _id: sellerId },
		{
			$pull: { menu: { categoryName: categoryName } },
		},
		(error, doc) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Succesfully deleted category");
				console.log(doc);
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
	console.log(categoryName);
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
				console.log(error);
			} else {
				console.log("Dish added successfully");
				res.send("ok");
			}
		}
	);
});
router.post("/deleteDish", upload.none(), (req, res) => {
	const categoryName = req.body.categoryName;
	const dishId = req.body.dishId;
	const sellerId = req.session.seller._id;
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
				console.log(error);
			} else {
				console.log("Dish deleted successfully");
				res.send("Dish deleted successfully");
			}
		}
	);
});

// MISCELLANEOUS
router.post("/updateTwoPrice", (req, res) => {
	const price = req.body.twoPrice;
	const sellerId = req.session.seller._id;
	console.log(price);
	Seller.findOneAndUpdate(
		{ _id: sellerId },
		{ $set: { costForTwo: price } },
		{ new: true },
		(error, doc) => {
			if (error) {
				console.log(error);
			} else {
				console.log(doc);
				req.session.seller.costForTwo = price;
				res.json(doc);
			}
		}
	);
});
module.exports = router;
