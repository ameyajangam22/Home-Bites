const express = require("express");
const upload = require("../../utils/multer");
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const _ = require("lodash");
const router = express.Router();
router.post("/addOrders", upload.none(), (req, res) => {
	console.log(req.body);
	let orders = req.body.orders;
	let finalOrders = [];
	orders.forEach((order) => {
		let final_order = JSON.parse(order);
		finalOrders.push(final_order);
	});
	console.log(finalOrders);
	var finalOrders2 = _.groupBy(finalOrders, (order) => {
		const restaurant = order.restaurantName;
		delete order.restaurantName;
		return restaurant;
	});
	// console.log("orders", finalOrders);
	// console.log("finalOrders2", finalOrders2);
	Object.entries(finalOrders2).forEach(([key, val]) => {
		console.log(key); // the name of the current key.
		console.log(val); // the value of the current key.
		val.forEach((order) => {
			Seller.findOneAndUpdate(
				{ restaurantName: key },
				{
					$push: {
						orders: {
							order_id: order.order_id,
							customerName: req.body.customerName,
							customerAddr: req.body.customerAddr,
							customerPhone: req.body.customerPhone,
							dishName: order.dishName,
							quantity: order.count,
							dishPrice: order.dishPrice,
						},
					},
				},
				(error, doc) => {
					if (error) throw error;
					else {
						console.log("Order updated");
					}
				}
			);
		});
	});
	res.send("ok");
});

router.post("/addUserOrders", upload.none(), (req, res) => {
	let orders = req.body.orders;
	console.log(orders);
	let finalOrders = [];
	orders.forEach((order) => {
		let final_order = JSON.parse(order);
		finalOrders.push(final_order);
	});
	console.log(finalOrders);
	finalOrders.forEach((order) => {
		User.findOneAndUpdate(
			{ email: req.body.customerEmail },
			{
				$push: {
					orders: {
						dishPic: order.dishPic,
						order_id: order.order_id,
						restaurantName: order.restaurantName,
						quantity: order.count,
						dishName: order.dishName,
						dishPrice: order.dishPrice,
					},
				},
			},
			(error, doc) => {
				if (error) throw error;
				else console.log("User order added");
			}
		);
	});
	res.send("ok");
});

module.exports = router;
