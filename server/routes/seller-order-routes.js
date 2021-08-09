const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
router.get("/getOrders", (req, res) => {
	const restaurantName = req.session.seller.restaurantName;
	Seller.find({ restaurantName: restaurantName })
		.populate("orders")
		.exec(function (error, doc) {
			if (error) throw error;
			res.json(doc[0].orders);
		});
});
router.get("/updateOrderStatus/:order_id", (req, res) => {
	const order_id = req.params.order_id;
	Order.findOneAndUpdate(
		{ order_id: order_id },
		{ $set: { dispatched: true } },
		(error, success) => {
			if (error) throw error;
			res.send("ok");
		}
	);
});
router.get("/getUserOrders", (req, res) => {
	User.find({ googleID: req.user.googleID })
		.populate("orders")
		.exec(function (error, doc) {
			if (error) throw error;
			res.json(doc[0].orders);
		});
});
module.exports = router;
