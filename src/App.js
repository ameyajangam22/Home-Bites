import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/search">
						<Search />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
