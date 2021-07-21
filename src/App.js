import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SellerHome from "./pages/SellerHome";
import SellerSignup from "./pages/SellerSignup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SellerLogin from "./pages/SellerLogin";
function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/search" component={Search}></Route>
					<Route exact path="/sellerSignup" component={SellerSignup}></Route>
					<Route exact path="/sellerLogin" component={SellerLogin}></Route>
					<Route exact path="/seller" component={SellerHome}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
