import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
const CartComponent = ({
	dishName,
	restaurantName,
	count,
	dishPrice,
	dishId,
	handleUpdate,
}) => {
	const handleDelete = () => {
		let orders = JSON.parse(localStorage.getItem("orders"));
		let index = orders.findIndex((el) => el.dishId === dishId);
		orders.splice(index, 1);
		localStorage.setItem("orders", JSON.stringify(orders));
		handleUpdate();
	};
	const increaseCount = () => {
		let orders = JSON.parse(localStorage.getItem("orders"));
		let index = orders.findIndex((el) => el.dishId === dishId);
		orders[index].count = orders[index];
		localStorage.setItem("orders", JSON.stringify(orders));
		handleUpdate();
	};
	return (
		<>
			<div className="col-span-1 text-center font-medium">
				{dishName}
				<div>
					<i>
						<small>{restaurantName}</small>
					</i>
				</div>
			</div>
			<div className="col-span-1 text-center font-medium">{count}</div>
			<div className="col-span-1 text-center font-medium">
				₹ {count * dishPrice}
			</div>
			<div
				onClick={handleDelete}
				className="w-6 col-span-1 flex m-auto font-medium"
			>
				<DeleteIcon />
			</div>
		</>
	);
};

export default CartComponent;
