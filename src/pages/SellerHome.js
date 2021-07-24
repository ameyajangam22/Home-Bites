import { useEffect } from "react";

const SellerHome = () => {
	useEffect(async () => {
		const response = await fetch("/meSeller");
		const data = await response.json();
		console.log("data", data);
	}, []);

	return (
		<>
			<h3>Seller Home</h3>
			<a href="http://localhost:8000/seller/logout">Logout</a>
		</>
	);
};

export default SellerHome;
