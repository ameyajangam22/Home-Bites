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
	console.log("CGHECDC", req.user.displayName);
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
				console.log("Comment added successfully");
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
				console.log("comment removed successfully");
				res.send("ok");
			}
		}
	);
});
router.get("/getComments/:sellerId", (req, res) => {
	const sellerId = req.params.sellerId;
	console.log("reached");

	Seller.find({ _id: sellerId }, (error, doc) => {
		if (error) throw errror;
		else res.json(doc[0].reviews);
	});
});
module.exports = router;
