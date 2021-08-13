const express = require("express");
const passport = require("passport");
const router = express.Router();
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

const isLoggedIn = (req, res, next) => {
	//
	if (req.user) {
		next();
	} else {
		// Unauthorised [to be used during checkout]
		res.sendStatus(401);
	}
};
router.get("/me", (req, res) => {
	//
	res.json({ user: req.user });
});
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/bad",
	}),
	function (req, res) {
		// Successful authentication, redirect home.

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
