import { useEffect, useState } from "react";

import CartComponent from "../Common/CartComponent";
const BillingCard = ({ finalAmount, setFinalAmount }) => {
	const [quantity, setQuantity] = useState(0);
	const [dishId, setDishId] = useState("");
	const [showBill, setShowBill] = useState(true);
	const [finalBill, setFinalBill] = useState(0);
	const [update, setUpdate] = useState(false);
	let total = 0;

	let orders = JSON.parse(localStorage.getItem("orders"));

	useEffect(() => {
		if (localStorage.getItem("orders")) {
			orders = JSON.parse(localStorage.getItem("orders"));
			orders.forEach((order) => (total += order.count * order.dishPrice));
			setFinalBill(total);
			setFinalAmount(total);
			//console.log(orders);
		} else {
			setShowBill(false);
		}
	}, [update]);

	return (
		<>
			{showBill ? (
				<div className=" w-3/4 md:w-full m-auto grid  grid-cols-4 gap-3 items-center  p-2 bg-gray-100">
					<div className="underline col-span-1 text-center font-medium">
						Dish Name
					</div>
					<div className="underline col-span-1 text-center font-medium">
						Qty
					</div>
					<div className="underline col-span-1 text-center font-medium">
						Price
					</div>
					<div className="underline col-span-1 text-center font-medium">
						Action
					</div>
					{orders && (
						<>
							{orders.map((order) => {
								return (
									<CartComponent
										dishName={order.dishName}
										restaurantName={order.restaurantName}
										dishPrice={order.dishPrice}
										count={order.count}
										dishId={order.dishId}
										handleUpdate={() => {
											setUpdate(!update);
										}}
									/>
								);
							})}
							{/* <hr className="col-span-3 " /> */}
							<div className="divide-y-2 pb-2 col-span-4">
								<div></div>
								<div></div>
							</div>
							<div className="col-span-1"></div>
							<div className="col-span-1"></div>
							<div className="pb-8 col-span-1 text-center">
								<h2 className="font-bold text-2xl text-red-600">
									₹ {finalBill}
								</h2>
							</div>
						</>
					)}
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default BillingCard;
