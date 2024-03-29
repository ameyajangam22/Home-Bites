const express = require("express");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");
const bcrypt = require("bcryptjs");
router.get("/emailVerify/:emailId", (req, res) => {
	// Check with DB if seller already exists
	let emailId = req.params.emailId;
	Seller.findOne({ sellerEmail: emailId }, (error, seller) => {
		if (seller) {
			res.json({ message: "This email exists already" });
		} else {
			res.json({ message: "" });
		}
	});
});
router.get("/restNameVerify/:restaurantName", (req, res) => {
	let restaurantName = req.params.restaurantName.toLowerCase();
	Seller.findOne({ restaurantName_lower: restaurantName }, (error, doc) => {
		if (doc) {
			res.json({ message: "Restaurant name already exists" });
		} else {
			res.json({ message: "" });
		}
	});
});
router.post("/uploadPic", upload.none(), async (req, res) => {
	try {
		//
		//
		let formData = new FormData();
		const mediaString = req.body.restaurantPic;
		formData.append("file", mediaString);
		formData.append("cloud_name", "home-bites");

		const pic = await fetch("https://api.cloudinary.com/v1_1/home-bites", {
			method: POST,
			body: formData,
		});
	} catch (err) {
		throw error;
	}
});
router.post("/addSeller", async (req, res) => {
	// Add new seller to DB
	const newSeller = new Seller({
		sellerName: req.body.sname,
		sellerEmail: req.body.semail,
		sellerPassword: req.body.spassword,
		restaurantName: req.body.srname,
		restaurantName_lower: req.body.srname.toLowerCase(),
		phoneNumber: req.body.sphone,
		restaurantPic: req.body.restaurantPic,
		cloudinaryId: req.body.cloudinaryId,
	});
	newSeller.sellerPassword = await bcrypt.hash(req.body.spassword, 10);
	await newSeller.save();

	res.redirect("/sellerLogin");
});
module.exports = router;
