import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import UserOrderComponent from "../components/Common/UserOrderComponent";
import Navbar from "../components/User/Navbar";

const UserOrders = () => {
	const history = useHistory();
	const [myOrders, setMyOrders] = useState([]);
	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (!data.user) {
			history.push("/");
			toast.error("Illegal login");
		}
		const response2 = await fetch("/getUserOrders");
		const orders = await response2.json();
		console.log(orders);
		setMyOrders(orders);
	}, []);
	return (
		<>
			<Navbar type="user" />

			<div className="w-full px-2 py-10 md:px-40 flex flex-col gap-4">
				<h3 className="text-4xl font-bold mt-4 mb-8 ">Your orders</h3>
				{myOrders.length > 0 &&
					myOrders.map((order) => {
						return (
							<UserOrderComponent
								restaurantName={order.restaurantName}
								order_id={order.order_id}
								dishName={order.dishName}
								dishPic={order.dishPic}
								quantity={order.quantity}
								dishPrice={order.dishPrice}
							/>
						);
					})}
			</div>
		</>
	);
};

export default UserOrders;
