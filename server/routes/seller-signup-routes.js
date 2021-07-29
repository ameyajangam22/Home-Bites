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
router.post("/uploadPic", upload.none(), async (req, res) => {
	try {
		// console.log("req.body", req.body);
		// console.log("req.file", req.file);
		let formData = new FormData();
		const mediaString = req.body.restaurantPic;
		formData.append("file", mediaString);
		formData.append("cloud_name", "home-bites");

		const pic = await fetch("https://api.cloudinary.com/v1_1/home-bites", {
			method: POST,
			body: formData,
		});
		console.log(pic.data.url);

		// const result = await cloudinary.uploader.upload(mediaString);
		// console.log("result cloudinary", result);
		// const need = {
		// 	public_id: result.public_id,
		// 	secure_url: result.secure_url,
		// };
		// res.json(need);
	} catch (err) {
		console.log("Image err", err);
	}
});
router.post("/addSeller", async (req, res) => {
	// Add new seller to DB
	// console.log("addseller", req.body);
	const newSeller = new Seller({
		sellerName: req.body.sname,
		sellerEmail: req.body.semail,
		sellerPassword: req.body.spassword,
		restaurantName: req.body.srname,
		phoneNumber: req.body.sphone,
		restaurantPic: req.body.restaurantPic,
		cloudinaryId: req.body.cloudinaryId,
	});
	newSeller.sellerPassword = await bcrypt.hash(req.body.spassword, 10);
	await newSeller.save();
	console.log("Check DB");
	res.redirect("/sellerLogin");
});
module.exports = router;
