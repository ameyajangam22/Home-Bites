import { useEffect, useState } from "react";

const orderid = require("order-id")("mysecret");
const DishComponent = ({ dish, cartCount, setCartCount, restaurantName }) => {
	const [counter, setCounter] = useState(0);
	let orders = [];

	const increaseCount = () => {
		if (localStorage.getItem("orders")) {
			orders = JSON.parse(localStorage.getItem("orders"));
		}
		let index = orders.findIndex((el) => el.dishId === dish._id);
		if (index === -1) {
			let newOrderId = orderid.generate();
			orders.push({
				order_id: newOrderId,
				dishPic: dish.foodPicUrl,
				dishId: dish._id,
				dishName: dish.foodName,
				restaurantName: restaurantName,
				dishPrice: dish.foodPrice,
				count: 1,
			});
		} else {
			orders[index].count = orders[index].count + 1;
		}
		localStorage.setItem("orders", JSON.stringify(orders));
		setCounter(counter + 1);
		setCartCount(cartCount + 1);
	};
	const decreaseCount = () => {
		if (counter > 0) {
			if (localStorage.getItem("orders")) {
				orders = JSON.parse(localStorage.getItem("orders"));
			}
			let index = orders.findIndex((el) => el.dishId === dish._id);
			if (counter === 1) {
				orders.splice(index, 1);
			} else {
				orders[index].count = orders[index].count - 1;
			}
			localStorage.setItem("orders", JSON.stringify(orders));
			setCounter(counter - 1);
			setCartCount(cartCount - 1);
		}
	};

	useEffect(() => {
		let minus = document.getElementById(dish._id);

		if (counter === 0) {
			minus.disabled = true;
		} else {
			minus.disabled = false;
		}
	}, [counter]);
	useEffect(async () => {
		const resp = await fetch("/me");
		const data = await resp.json();
		if (data.user) {
			if (localStorage.getItem("orders")) {
				orders = JSON.parse(localStorage.getItem("orders"));
			}
			let index = orders.findIndex((el) => el.dishId === dish._id);
			if (index !== -1) {
				setCounter(orders[index].count);
			}
		}
	}, []);
	return (
		<>
			<div className="grid grid-cols-4 p-4 border-2 items-center">
				<h2 className="text-center col-span-1 text-sm md:text-lg">
					{dish.foodName}
				</h2>
				<h2 className="text-center col-span-1 text-sm md:text-lg">
					₹ {dish.foodPrice}
				</h2>
				{dish.isVeg ? (
					<>
						<div className="ml-5 border-2 border-green-500 flex h-6 w-6 md:h-8 md:w-8 justify-center items-center">
							<div className="bg-green-500 h-2 w-2 md:h-3 md:w-3 rounded-full"></div>
						</div>
					</>
				) : (
					<>
						<div className="ml-5 border-2 border-red-500 flex h-6 w-6 md:h-8 md:w-8 justify-center items-center">
							<div className=" bg-red-500 h-2 w-2 md:h-3 md:w-3 rounded-full"></div>
						</div>
					</>
				)}
				<div className="col-span-1 ">
					<img
						className="rounded-md w-full z-10 items-center"
						src={dish.foodPicUrl}
						alt=""
					/>
					<div className=" grid grid-cols-3 justify-center  w-full items-center relative bottom-3 md:bottom-8 h-4 md:h-8 bg-gray-100 opacity-90 z-10">
						<button
							id={dish._id}
							onClick={decreaseCount}
							className="disabled:opacity-50 col-span-1 w-full font-medium rounded-md bg-red-500 text-white md:text-2xl "
						>
							-
						</button>
						<div className="col-span-1 text-center font-medium md:text-xl text-gray-800">
							{counter}
						</div>
						<button
							onClick={increaseCount}
							className="col-span-1 bg-green-500 w-full rounded-md font-medium md:text-2xl text-white"
						>
							+
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default DishComponent;
