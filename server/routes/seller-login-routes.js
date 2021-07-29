const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");
const bcrypt = require("bcryptjs");

router.get("/meSeller", (req, res) => {
	if (req.session.seller) res.json({ data: req.session.seller, message: "ok" });
	else res.json({ message: "not ok" });
});
router.post("/authLogin", upload.none(), (req, res) => {
	//console.log("formdata", req.body);
	const emailId = req.body.semail;
	const password = req.body.spassword;

	Seller.findOne({ sellerEmail: emailId }, async (error, seller) => {
		if (seller) {
			const isPassword = await bcrypt.compare(password, seller.sellerPassword);
			if (isPassword) {
				req.session.seller = seller;
				res.json({ message: "ok" });
			} else {
				res.json({
					message: "Email and password don't match",
				});
			}
		} else {
			res.json({ message: "Email doesn't exist" });
		}
	});
});

// Logout
router.get("/seller/logout", (req, res) => {
	req.logout();
	req.session.destroy((err) => {
		res.clearCookie("connect.sid");
		// Don't redirect, just print text
		res.redirect("http://localhost:3000");
	});
});
module.exports = router;
