import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SellerNav from "../components/User/SellerNav";
import { toast } from "react-toastify";
const SellerHome = () => {
	const history = useHistory();
	const [userName, setUserName] = useState("Seller");
	const [restaurantPic, setRestaurantPic] = useState("");
	useEffect(async () => {
		const response = await fetch("/meSeller");
		const data = await response.json();
		console.log("data1", data);
		if (data.message == "ok") {
			console.log("datahere");
			setUserName(data.data.sellerName);
			setRestaurantPic(data.data.restaurantPic);
			console.log("data", data);
		} else {
			console.log("here");
			localStorage.setItem("isSellerAuthenticated", "false");
			history.push("/sellerLogin");
			toast("Illegal login");
		}
	}, []);

	return (
		<>
			<SellerNav userName={userName} />
			{/* console.log(restaurantPic); */}
			<div>
				<img
					className="aspect-w-16 aspect-h-9 w-44 md:w-80"
					src={restaurantPic}
					alt="rest-pic"
				/>
				<h1>Your Menu</h1>
				<div className="bg-red-200 h-16"></div>
			</div>
		</>
	);
};

export default SellerHome;
