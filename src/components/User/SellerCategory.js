import { ReactComponent as PlusIcon } from "../../icons/plus-icon.svg";
import { ReactComponent as DownArrow } from "../../icons/down-arrow.svg";
import { ReactComponent as UpArrow } from "../../icons/up-arrow.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
import { useState, Fragment } from "react";
import Modal from "../Common/Modal";
import SellerDish from "./SellerDish";
import { Transition } from "@headlessui/react";
const SellerCategory = (props) => {
	const [arrowDir, setArrowDir] = useState("down");
	const [showModal, setShowModal] = useState(false);
	const [dish, setDish] = useState({
		foodName: "",
		foodPrice: 0,
		isVeg: true,
	});
	const dishes = props.dishes;
	const handleClick = () => {
		if (arrowDir === "down") {
			setArrowDir("up");
		} else {
			setArrowDir("down");
		}
	};
	const handleDelete = async () => {
		// HANDLES DELETE OF CATEGORIES
		const categoryName = props.categoryName;
		let formData = new FormData();
		formData.append("categoryName", categoryName);
		const response = await fetch("/deleteCategory", {
			method: "POST",
			body: formData,
		});
		props.onChange();
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setDish((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = async () => {
		console.log(dish);
		const { foodName, foodPrice, isVeg } = dish;
		const categoryName = props.categoryName;
		const formData = new FormData();
		formData.append("foodName", foodName);
		formData.append("foodPrice", foodPrice);
		formData.append("isVeg", isVeg);
		formData.append("categoryName", categoryName);
		const response = await fetch("/addDish", {
			method: "POST",
			body: formData,
		});
		setShowModal(false);
		props.onChange();
	};
	return (
		<>
			<div class="w-full flex justify-between p-2 px-5 items-center hover:bg-gray-100 transition ease-in-out duration-200  mt-1 border-1 border-black text-lg font-bold bg-white">
				{props.categoryName}
				<div class="flex flex-row gap-4 items-center">
					<div
						class="cursor-pointer"
						onClick={() => {
							setShowModal(true);
						}}
					>
						<PlusIcon />
					</div>
					<div class="cursor-pointer" onClick={handleDelete}>
						<DeleteIcon />
					</div>
					<div class="cursor-pointer" onClick={handleClick}>
						{arrowDir == "down" ? <DownArrow /> : <UpArrow />}
					</div>
				</div>
			</div>
			{/* MODAL */}
			<Transition
				show={arrowDir == "up" ? true : false}
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-100 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				{dishes.length > 0 && (
					<div className="grid grid-cols-4 w-full font-bold p-4 justify-around bg-gray-200">
						<h1 class="col-span-1">Name</h1>
						<h1 class=" col-span-1 text-center">Price</h1>
						<h1 class="col-span-1 ml-5">Veg?</h1>
					</div>
				)}

				{dishes.map((dish) => {
					return (
						<SellerDish
							categoryName={props.categoryName}
							dishId={dish._id}
							foodName={dish.foodName}
							foodPrice={dish.foodPrice}
							isVeg={dish.isVeg}
							onChange={() => {
								props.onChange();
							}}
						/>
					);
				})}
			</Transition>

			{showModal && (
				<Modal
					showModal={showModal}
					onChange={(val) => {
						setShowModal(val);
					}}
					title="Add a new Dish"
				>
					<div className="flex flex-col mt-10 gap-3 relative top-2 relative w-4/5 ">
						<input
							class="border-2 px-2  focus:border-blue-400 h-10 rounded-md outline-none shadow-sm"
							type="text"
							name="foodName"
							placeholder="Dish Name"
							onChange={handleChange}
						/>
						<input
							class="border-2 px-2 focus:border-blue-400 h-10 rounded-md outline-none shadow-sm"
							type="number"
							name="foodPrice"
							placeholder="Dish Price"
							onChange={handleChange}
						/>
						<div class="flex gap-10 relative top-3 justify-center items-center">
							<div class="flex gap-4 justify-center items-center">
								<label for="isVeg">Veg</label>
								<input
									onChange={handleChange}
									type="radio"
									name="isVeg"
									value="veg"
								/>
							</div>
							<div class="flex gap-4 justify-center items-center">
								<label for="isVeg">Non Veg</label>
								<input
									onChange={handleChange}
									type="radio"
									name="isVeg"
									value="nonveg"
								/>
							</div>
						</div>
						<button
							onClick={handleSubmit}
							class=" bg-green-500 text-lg px-8 py-2 relative top-9 rounded-sm hover:bg-green-600 transition ease-in-out duration-300 text-white w-auto bottom-0"
						>
							Submit
						</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default SellerCategory;