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
const sellerRoutes = require("./routes/seller-routes");
const userRoutes = require("./routes/user-routes");
const Razorpay = require("razorpay");
const shortid = require("shortid");
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

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY,
	key_secret: process.env.RAZORPAY_SECRET_KEY,
});
//Routes
app.use(sellerSignupRoutes);
app.use(sellerLoginRoutes);
app.use(sellerRoutes);
app.use(userRoutes);

// payment routes
app.post("/razorpay/:finalAmount", async (req, res) => {
	const payment_capture = 1;
	const amount = req.params.finalAmount;
	const currency = "INR";
	const options = {
		amount: (amount * 100).toString(),
		currency,
		receipt: shortid.generate(),
		payment_capture,
	};
	const response = await razorpay.orders.create(options);
	console.log(response);
	res.json({
		id: response.id,
		currency: response.currency,
		amount: response.amount,
	});
});

// Don't need this as of now as we dont need to validate really

// app.post("/verification", (req, res) => {
// 	const secret = process.env.RAZORPAY_SECRET_WBHK;
// 	// console.log(req.body);

// 	const crypto = require("crypto");
// 	const shasum = crypto.createHmac("sha256", secret);
// 	shasum.update(JSON.stringify(req.body));
// 	const digest = shasum.digest("hex");

// 	console.log(digest, req.headers["x-razorpay-signature"]);
// 	if (digest === req.headers["x-razorpay-signature"]) {
// 		//process it
// 		console.log("Request is legit");
// 	} else {
// 		console.log("dont match");
// 		res.status(401).send("not ok");
// 	}
// 	res.send({ status: "ok" });
// });

//listen
app.listen(8000, () => {
	console.log("Server up and running");
});
