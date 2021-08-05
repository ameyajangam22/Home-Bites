import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation,
} from "react-router-dom";
import SellerHome from "./pages/SellerHome";
import SellerSignup from "./pages/SellerSignup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SellerLogin from "./pages/SellerLogin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";
import SellerPage from "./pages/SellerPage";
import Checkout from "./pages/Checkout";
import SellerOrders from "./components/User/SellerOrders";
import UserOrders from "./pages/UserOrders";
import "cropperjs/dist/cropper.css";

function App() {
	toast.configure();
	const [isUserAuth, setIsUserAuth] = useState(true);
	const [isSellerAuth, setIsSellerAuth] = useState(false);
	const location = useLocation();

	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/search" component={Search}></Route>
				<Route exact path="/sellerLogin" component={SellerLogin}></Route>
				<Route exact path="/sellerPage" component={SellerPage}></Route>
				<ProtectedRoute
					exact
					path="/sellerSignup"
					component={SellerSignup}
					type="user"
					good={isUserAuth}
					redirect="/"
					customMessage="Not allowed. Logout as user first"
				/>
				<ProtectedRoute
					exact
					path="/seller"
					component={SellerHome}
					good={isSellerAuth}
					type="seller"
					redirect="/sellerLogin"
					customMessage="Login as seller first"
				/>
				<Route exact path="/checkout" component={Checkout}></Route>
				<Route exact path="/seller/myOrders" component={SellerOrders}></Route>
			</Switch>
			<ProtectedRoute
				exact
				path="/userOrders"
				component={UserOrders}
				type="userOrders"
				redirect="/"
				customMessage="Login as user first"
			/>
			<ToastContainer />
		</div>
	);
}

export default App;
