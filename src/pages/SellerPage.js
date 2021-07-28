import { useEffect } from "react";
import Navbar from "../components/User/Navbar";

const SellerPage = (props) => {
	useEffect(async () => {
		const sellerId = props.history.location.state.sellerId;
		const response = await fetch(`/getSeller/${sellerId}`);
		const data = await response.json();
		console.log(data);
	}, []);
	return (
		<>
			<Navbar />
			<h3>Wait</h3>
		</>
	);
};

export default SellerPage;
