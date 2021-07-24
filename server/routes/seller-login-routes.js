const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const Seller = require("../models/sellerModel");

router.get("/meSeller", (req, res) => {
	res.json(req.session.seller);
});
router.post("/authLogin", upload.none(), (req, res) => {
	//console.log("formdata", req.body);
	const emailId = req.body.semail;
	const password = req.body.spassword;

	Seller.findOne({ sellerEmail: emailId }, (error, seller) => {
		if (seller) {
			if (password == seller.sellerPassword) {
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
