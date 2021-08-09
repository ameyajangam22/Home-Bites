import { useEffect, useState } from "react";
import OrderComponent from "../Common/OrderComponent";
import SellerNav from "./SellerNav";

const SellerCompleted = () => {
	const [userName, setUserName] = useState("Seller");
	const [orders, setOrders] = useState([]);

	useEffect(async () => {
		const response = await fetch("/meSeller");
		const data = await response.json();
		if (data.data.sellerName) setUserName(data.data.sellerName);
		const response2 = await fetch("/getOrders");
		const orders2 = await response2.json();
		// console.log("data2", data2);
		let newData = orders2.filter((order) => {
			return order.dispatched == true;
		});
		// console.log("sorteddata2", orders2);
		setOrders(newData);
	}, []);
	return (
		<>
			<SellerNav userName={userName} />

			<div className="w-full px-2 py-10 md:px-40 flex flex-col gap-4">
				<h3 className="text-4xl font-bold mt-4 mb-8 "> ✅ Completed Orders</h3>
				{orders.length > 0 &&
					orders.map((order) => {
						return (
							<OrderComponent
								customerName={order.customerName}
								customerAddr={order.customerAddr}
								order_id={order.order_id}
								dishName={order.dishName}
								quantity={order.quantity}
								dishPrice={order.dishPrice}
								onUpdate={() => {}}
								type="completed"
							/>
						);
					})}
			</div>
		</>
	);
};

export default SellerCompleted;
