const User = require("../models/userModel");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
module.exports = (passport) => {
	passport.serializeUser(function (user, done) {
		// console.log("USSSSER", user);
		done(null, user);
	});

	passport.deserializeUser(function (id, done) {
		// User.findById(id, function (err, user) {
		// console.log("what is being passed", id);
		done(null, id);
		// });
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID:
					"323156205623-dgt6o9i2uhbincaiqe7r9m6mmtqgq9s9.apps.googleusercontent.com",
				clientSecret: "_09cFL50rXIB7-qQdIJuU0C0",
				callbackURL: "http://localhost:8000/google/callback",
			},
			function (accessToken, refreshToken, profile, cb) {
				// console.log("Checking for new logged in profile: ", profile);

				User.findOne({ googleID: profile.id }, async (err, user) => {
					if (err) throw err;

					// console.log("User is: ", user);
					if (user) {
						// console.log("Inside log in: ", user);
						cb(null, user);
					} else {
						const newUser = new User({
							googleID: profile.id,
							email: profile.emails[0].value,
							displayName: profile.displayName,
							phoneNo: null,
							username: null,
						});
						await newUser.save();
						// console.log("New User saved: ", newUser);
						cb(null, newUser);
					}
				});
			}
		)
	);
};
