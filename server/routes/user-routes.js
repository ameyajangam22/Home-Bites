const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");
const mongoose = require("mongoose");
router.get("/getSeller/:sellerId", (req, res) => {
	const sellerId = req.params.sellerId;
	Seller.find({ _id: sellerId }, (error, doc) => {
		if (error) throw error;
		res.json(doc);
	});
});
router.get("/getSellers", (req, res) => {
	Seller.find(
		{},
		{
			restaurantName: 1,
			restaurantPic: 1,
			reviews: 1,
			costForTwo: 1,
			overallRating: 1,
		},
		(error, doc) => {
			if (error) throw error;
			else {
				res.json(doc);
			}
		}
	);
});
router.post("/updateOverallRating", upload.none(), (req, res) => {
	const rating = req.body.overallRating;
	const sellerId = req.body.sellerId;
	Seller.findOneAndUpdate(
		{ _id: sellerId },
		{ $set: { overallRating: rating } },
		(error, doc) => {
			if (error) throw error;
			else {
				res.send("ok");
			}
		}
	);
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
					userEmail: req.user.email,
					userName: req.user.displayName,
					rating: rating,
					review: comment,
				},
			},
		},
		(error, doc) => {
			if (error) throw error;
			else {
				res.send("ok");
			}
		}
	);
});
router.get("/deleteComment/:sellerId/:commentId", (req, res) => {
	const id = req.params.commentId;
	const sid = req.params.sellerId;
	Seller.findOneAndUpdate(
		{ _id: sid },
		{ $pull: { reviews: { _id: mongoose.Types.ObjectId(id) } } },
		(error, doc) => {
			if (error) throw error;
			else {
				res.send("ok");
			}
		}
	);
});
router.get("/getComments/:sellerId", (req, res) => {
	const sellerId = req.params.sellerId;

	Seller.find({ _id: sellerId }, (error, doc) => {
		if (error) throw error;
		else res.json(doc[0].reviews);
	});
});
module.exports = router;
