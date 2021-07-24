import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SellerHome from "./pages/SellerHome";
import SellerSignup from "./pages/SellerSignup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SellerLogin from "./pages/SellerLogin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
	toast.configure();

	const [isUserAuth, setIsUserAuth] = useState(false);
	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (data.user) {
			if (data.user.googleID) {
				setIsUserAuth(true);
			} else {
				setIsUserAuth(false);
			}
		}
	}, []);
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/search" component={Search}></Route>
					<Route exact path="/sellerLogin" component={SellerLogin}></Route>
					<Route exact path="/seller" component={SellerHome}></Route>
					<ProtectedRoute
						exact
						path="/sellerSignup"
						component={SellerSignup}
						redirect="/"
						isAuth={!isUserAuth}
					/>
				</Switch>
			</Router>
			<ToastContainer />
		</div>
	);
}

export default App;
