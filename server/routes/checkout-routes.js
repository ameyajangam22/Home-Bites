const express = require("express");
const upload = require("../../utils/multer");
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const router = express.Router();
const Order = require("../models/orderModel");
const mongoose = require("mongoose");
router.post("/addOrders", upload.none(), (req, res) => {
	// console.log(req.body);
	let orders = req.body.orders;
	let finalOrders = [];
	orders.forEach((order) => {
		let final_order = JSON.parse(order);
		finalOrders.push(final_order);
	});
	// console.log(finalOrders);
	finalOrders.forEach(async (order) => {
		const newOrder = new Order({
			order_id: order.order_id,
			sellerRestaurant: order.restaurantName,
			userEmail: req.body.customerEmail,
			customerAddr: req.body.customerAddr,
			customerPhone: req.body.customerPhone,
			customerName: req.body.customerName,
			dishPic: order.dishPic,
			dishName: order.dishName,
			quantity: order.count,
			dishPrice: order.dishPrice,
		});
		await newOrder.save(function (err, doc) {
			let objId = doc._id;
			console.log("senku", doc);
			User.findOneAndUpdate(
				{ email: req.body.customerEmail },
				{ $push: { orders: mongoose.Types.ObjectId(objId) } },
				(error, success) => {
					if (error) throw error;
				}
			);
			Seller.findOneAndUpdate(
				{ restaurantName: order.restaurantName },
				{ $push: { orders: mongoose.Types.ObjectId(objId) } },
				(error, success) => {
					if (error) throw error;
				}
			);
		});
	});

	res.send("ok");
});

module.exports = router;
