import { ReactComponent as CheckIcon } from "../../icons/check2.svg";
const OrderComponent = (props) => {
	const handleClick = async () => {
		const response = await fetch("/updateOrderStatus/" + props.order_id);
		props.onUpdate();
	};
	return (
		<>
			<div className="flex flex-col gap-6 rounded-md md:transform hover:scale-105 hover:shadow-md transition ease-in-out duration-300  bg-gray-50 p-4">
				<h2 className="bg-blue-500 text-white p-1 md:p-3 font-bold">
					Order ID:{" "}
					<span className="font-medium text-white">{props.order_id}</span>
				</h2>
				{props.type === "current" && (
					<button
						onClick={handleClick}
						className="w-40 flex items-center justify-center gap-2 text-sm md:text-base md:w-80 ml-auto p-1 md:p-2 bg-green-500 text-white"
					>
						<CheckIcon />
						Mark as Dispatched
					</button>
				)}

				<h2 className="font-bold">
					Cust Name:{" "}
					<span className="font-medium text-gray-700">
						{props.customerName}
					</span>
				</h2>
				<h2 className="font-bold">
					Cust Addr:{" "}
					<span className="font-medium text-gray-700">
						{props.customerAddr}
					</span>
				</h2>
				<div className="grid grid-cols-3">
					<div className="col-span-1 text-center font-bold">Dish</div>
					<div className="col-span-1 text-center font-bold">Quantity</div>
					<div className="col-span-1 text-center font-bold">Amount</div>
					<div className="col-span-1 text-center">{props.dishName}</div>
					<div className="col-span-1 text-center">{props.quantity}</div>
					<div className="col-span-1 text-center text-green-600 font-medium">
						₹ {props.dishPrice * props.quantity}
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderComponent;
