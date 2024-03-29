import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
import { toast } from "react-toastify";
const SellerDish = (props) => {
	const handleDelete = async () => {
		// HANDLES DELETE OF DISHES
		let formData = new FormData();
		formData.append("categoryName", props.categoryName);
		formData.append("dishId", props.dishId);
		formData.append("dishCloudinaryId", props.dishCloudinaryId);
		const response = await fetch("/deleteDish", {
			method: "POST",
			body: formData,
		});
		toast.success("Dish deleted", {
			draggable: true,
		});
		props.onChange();
	};
	return (
		<div className="grid grid-cols-5 w-full p-4 justify-center items-center bg-gray-200">
			<h1 className="col-span-1">{props.foodName}</h1>
			<h1 className="col-span-1 text-center">{props.foodPrice}</h1>
			{props.isVeg ? (
				<>
					<div className="ml-5 border-2 border-green-500 flex h-6 w-6 md:h-8 md:w-8 justify-center items-center">
						<div className="bg-green-500 h-2 w-2 md:h-3 md:w-3 rounded-full"></div>
					</div>
				</>
			) : (
				<>
					<div className="ml-5 border-2 border-red-500 flex h-6 w-6 md:h-8 md:w-8 justify-center items-center">
						<div className="bg-red-500 h-2 w-2 md:h-3 md:w-3 rounded-full"></div>
					</div>
				</>
			)}
			<div className="col-span-1 relative">
				<img className="relative w-24" src={props.foodPicUrl} alt="" />
			</div>
			<div
				onClick={handleDelete}
				className="col-span-1 flex cursor-pointer justify-end"
			>
				<DeleteIcon />
			</div>
		</div>
	);
};

export default SellerDish;
