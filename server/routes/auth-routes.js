const express = require("express");
const passport = require("passport");
const router = express.Router();
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

const isLoggedIn = (req, res, next) => {
	// console.log("req.user", req.user);
	if (req.user) {
		next();
	} else {
		// Unauthorised [to be used during checkout]
		res.sendStatus(401);
	}
};
router.get("/me", (req, res) => {
	// console.log("mai kya bhej raha hu", req.user);
	res.json({ user: req.user });
});
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/bad",
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		console.log("req.user [success]", req.user);
		res.redirect("http://localhost:3000");
	}
);

router.get("/logout", (req, res) => {
	// req.session = null;
	req.logout();
	req.session.destroy((err) => {
		res.clearCookie("connect.sid");
		// Don't redirect, just print text
		res.redirect("http://localhost:3000");
	});
});

module.exports = router;
