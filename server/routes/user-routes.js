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
router.post("/addComment", upload.none(), (req, res) => {
	const rating = req.body.rating;
	const comment = req.body.comment;
	const id = req.body.sellerId;
	Seller.findOneAndUpdate(
		{ _id: id },
		{
			$push: {
				reviews: {
					username: req.user.displayName,
					rating: rating,
					review: comment,
				},
			},
		},
		(error, doc) => {
			if (error) throw error;
			else {
				console.log("Comment added successfully");
				res.send("ok");
			}
		}
	);
});
module.exports = router;
