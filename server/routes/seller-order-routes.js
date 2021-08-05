const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
router.get("/getOrders", (req, res) => {
	const restaurantName = req.session.seller.restaurantName;
	Seller.find({ restaurantName: restaurantName }, (error, doc) => {
		if (error) throw error;
		else {
			console.log(doc[0].orders);
			res.json(doc[0].orders);
		}
	});
});
router.get("/getUserOrders", (req, res) => {
	User.find({ googleID: req.user.googleID }, (error, doc) => {
		if (error) throw error;
		else {
			// console.log(doc[0].orders);
			res.json(doc[0].orders);
		}
	});
});
module.exports = router;
