const express = require("express");
const app = express();
var cors = require("cors");
const cookieSession = require("cookie-session");
// const session = require("express-session");
const passport = require("passport");
const User = require("./models/userModel");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const dbConnection = require("./config/connectdb");
const authRoutes = require("./routes/auth-routes");

dbConnection.db();
//body parser
app.use(express.json());
app.use(express.urlencoded());

// To prevent cors error
app.use(cors());
// Making cookie session
app.use(
	cookieSession({
		name: "hb-session",
		keys: ["key1", "key2"],
	})
);

// initialising session from passport
app.use(passport.initialize());
app.use(passport.session());

// setting up config for google auth
// require("./config/auth-config")(passport);

passport.serializeUser(function (user, done) {
	console.log("USSSSER", user);
	done(null, user);
});

passport.deserializeUser(function (id, done) {
	// User.findById(id, function (err, user) {
	console.log("what is being passed", id);
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
			console.log("Checking for new logged in profile: ", profile);

			User.findOne({ googleID: profile.id }, async (err, user) => {
				if (err) throw err;

				console.log("User is: ", user);
				if (user) {
					console.log("Inside log in: ", user);
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
					console.log("New User saved: ", newUser);
					cb(null, newUser);
				}
			});
		}
	)
);

// Listening for google authentication
app.use(authRoutes);

app.listen(8000, () => {
	console.log("Server up and running");
});
