const express = require("express");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");

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
router.post("/uploadPic", upload.single("restaurantPic"), async (req, res) => {
	try {
		// console.log("req.body", req.body);
		// console.log("req.file", req.file);
		const result = await cloudinary.uploader.upload(req.file.path);
		// console.log("result cloudinary", result);
		const need = {
			public_id: result.public_id,
			secure_url: result.secure_url,
		};
		res.json(need);
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
	await newSeller.save();
	console.log("Check DB");
	res.redirect("/sellerLogin");
});
module.exports = router;
