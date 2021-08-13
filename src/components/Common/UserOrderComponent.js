const UserOrderComponent = (props) => {
	return (
		<>
			<div className="flex flex-col py-10  gap-6 rounded-md md:transform hover:scale-105 hover:shadow-md transition ease-in-out duration-300  bg-gray-50 p-4">
				<h2 className="bg-gradient-to-l from-blue-400 to-blue-600  text-white p-1 md:p-3 font-bold">
					Order ID:{" "}
					<span className="font-medium text-white">{props.order_id}</span>
				</h2>
				<h2 className="font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white min-w-72 p-4">
					Restaurant Name:{" "}
					<span className="font-medium text-white">{props.restaurantName}</span>
				</h2>
				<div className="flex">
					<h2 className="mt-5 text-lg md:text-xl font-bold">
						Status:{" "}
						{!props.dispatched ? (
							<span className="ml-4 bg-yellow-400 p-3 rounded text-white">
								<span className="animate-spin">🍳</span> Cooking
							</span>
						) : (
							<span className="ml-4 bg-green-400 p-3 rounded text-white">
								<span className="animate-spin">🚚</span> Delivered
							</span>
						)}
					</h2>
					<img
						className=" ml-auto mb-2 w-40 rounded-md"
						src={props.dishPic}
						alt="dish-pic"
					/>
				</div>
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

export default UserOrderComponent;
