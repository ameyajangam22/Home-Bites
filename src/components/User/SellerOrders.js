import { useEffect, useState } from "react";
import OrderComponent from "../Common/OrderComponent";
import SellerNav from "./SellerNav";

const SellerOrders = () => {
	const [userName, setUserName] = useState("Seller");
	const [orders, setOrders] = useState([]);
	const updateOrders = async () => {
		const response = await fetch("/getOrders");
		const data = await response.json();
		let newData = data.filter((order) => {
			return order.dispatched == false;
		});
		setOrders(newData);
	};
	useEffect(async () => {
		const response = await fetch("/meSeller");
		const data = await response.json();
		if (data.data.sellerName) setUserName(data.data.sellerName);
		const response2 = await fetch("/getOrders");
		const orders2 = await response2.json();
		orders2.sort((a, b) => b.created_at - a.created_at);
		let newData = orders2.filter((order) => {
			return order.dispatched == false;
		});
		setOrders(newData);
	}, []);
	return (
		<>
			<SellerNav userName={userName} />

			<div className="w-full px-2 py-10 md:px-40 flex flex-col gap-4">
				<h3 className="text-4xl font-bold mt-4 mb-8 ">🥗 Your orders</h3>
				{orders.length > 0 &&
					orders.map((order) => {
						return (
							<OrderComponent
								key={order._id}
								customerName={order.customerName}
								customerAddr={order.customerAddr}
								order_id={order.order_id}
								dishName={order.dishName}
								quantity={order.quantity}
								dishPrice={order.dishPrice}
								onUpdate={() => {
									updateOrders();
								}}
								type="current"
							/>
						);
					})}
			</div>
		</>
	);
};

export default SellerOrders;
