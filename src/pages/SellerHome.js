import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SellerNav from "../components/User/SellerNav";
import { toast } from "react-toastify";
const SellerHome = () => {
	const history = useHistory();
	const [userName, setUserName] = useState("Seller");
	useEffect(async () => {
		const response = await fetch("/meSeller");
		const data = await response.json();
		console.log("data1", data);
		if (data.message == "ok") {
			console.log("datahere");
			setUserName(data.data.sellerName);
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
			<h3>Seller Home</h3>
			<a href="http://localhost:8000/seller/logout">Logout</a>
		</>
	);
};

export default SellerHome;
