const express = require("express");
const app = express();
var cors = require("cors");
const cookieSession = require("cookie-session");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const User = require("./models/userModel");
const dbConnection = require("./config/connectdb");
const authRoutes = require("./routes/auth-routes");
const sellerSignupRoutes = require("./routes/seller-signup-routes");
const sellerLoginRoutes = require("./routes/seller-login-routes");
dbConnection.db();
//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// To prevent cors error
app.use(cors());
// Making cookie session
app.use(
	session({
		secret: "user",
		resave: false,
		saveUninitialized: false,
		rolling: true, // <-- Set `rolling` to `true`
		cookie: {
			httpOnly: true,
			maxAge: 8 * 60 * 60 * 1000,
		},
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
		}),
	})
);

// initialising session from passport
app.use(passport.initialize());
app.use(passport.session());

// setting up config for google auth
require("./config/auth-config")(passport);
// Listening for google authentication
app.use(authRoutes);

//Routes
app.use(sellerSignupRoutes);
app.use(sellerLoginRoutes);
app.get("/seller");
//listen
app.listen(8000, () => {
	console.log("Server up and running");
});
