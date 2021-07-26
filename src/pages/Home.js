import { useEffect } from "react";
import Carousel from "../components/User/Carousel";
import MarketPlace from "../components/User/MarketPlace";
import Navbar from "../components/User/Navbar";

const Home = () => {
	useEffect(() => {
		localStorage.setItem("isSellerAuthenticated", "false");
	}, []);
	return (
		<>
			<Navbar type="user" pg="home" />
			<Carousel />
			<MarketPlace />
		</>
	);
};

export default Home;
