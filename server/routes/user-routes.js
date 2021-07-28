const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");

router.get("/getSeller/:sellerId", (req, res) => {
	const sellerId = req.params.sellerId;
	Seller.find({ _id: sellerId }, (error, doc) => {
		if (error) throw error;
		res.json(doc);
	});
});
router.get("/getSellers", (req, res) => {
	Seller.find({}, { restaurantName: 1, restaurantPic: 1 }, (error, doc) => {
		if (error) console.log(error);
		else {
			res.json(doc);
		}
	});
});
module.exports = router;
