import Carousel from "../components/User/Carousel";
import MarketPlace from "../components/User/MarketPlace";
import Navbar from "../components/User/Navbar";

const Home = () => {
	return (
		<>
			<Navbar type="user" />
			<Carousel />
			<MarketPlace />
		</>
	);
};

export default Home;
