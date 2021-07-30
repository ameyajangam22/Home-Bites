import { ReactComponent as PlusIcon } from "../../icons/plus-icon.svg";
import { ReactComponent as DownArrow } from "../../icons/down-arrow.svg";
import { ReactComponent as UpArrow } from "../../icons/up-arrow.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete-icon.svg";
import { ReactComponent as CloudIcon } from "../../icons/cloud-upload.svg";
import { useState, Fragment } from "react";
import Modal from "../Common/Modal";
import SellerDish from "./SellerDish";
import axios from "axios";
import { Transition } from "@headlessui/react";
import CropImageModal from "./CropperImageFoodModal";
const myConfig = require("../../myConfig");

const SellerCategory = (props) => {
	const [arrowDir, setArrowDir] = useState("down");
	const [showModal, setShowModal] = useState(false);
	const [showCropperModal, setShowCropperModal] = useState(false);
	const [media, setMedia] = useState(null);
	const [previewSource, setpreviewSource] = useState(null);
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

		console.log(dishes);
		let dishArray = [];
		dishes.forEach((dish) => dishArray.push(dish.dishCloudinaryId));
		formData.append("dishes", dishArray);
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
	const handleFoodImage = (e) => {
		const file = e.target.files[0];
		setMedia(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setpreviewSource(reader.result);
		};
		setShowCropperModal(true);
	};
	const handleSubmit = async () => {
		console.log(dish);

		// UPLOAD IMAGE TO CLOUDINARY
		let formData2 = new FormData();
		formData2.append("file", media);
		formData2.append("upload_preset", "ml_default");
		formData2.append("cloud_name", "home-bites");
		const response2 = await axios.post(myConfig.CLOUDINARY_URL, formData2);
		const foodPicUrl = response2.data.secure_url;
		const dishCloudinaryId = response2.data.public_id;
		const { foodName, foodPrice, isVeg } = dish;
		const categoryName = props.categoryName;
		const formData = new FormData();
		formData.append("foodName", foodName);
		formData.append("foodPrice", foodPrice);
		formData.append("isVeg", isVeg);
		formData.append("categoryName", categoryName);
		formData.append("foodPicUrl", foodPicUrl);
		formData.append("dishCloudinaryId", dishCloudinaryId);
		const response = await fetch("/addDish", {
			method: "POST",
			body: formData,
		});
		setpreviewSource(null);
		setMedia(null);
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
					<div className="grid grid-cols-5  w-full font-bold p-4 justify-around bg-gray-200">
						<h1 class="text-center col-span-1">Name</h1>
						<h1 class="text-center col-span-1 ">Price</h1>
						<h1 class="text-center col-span-1">Veg?</h1>
						<h1 class="text-center col-span-1 mr-10 ">Image</h1>
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
							foodPicUrl={dish.foodPicUrl}
							dishCloudinaryId={dish.dishCloudinaryId}
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
						setMedia(null);
						setpreviewSource(null);
					}}
					title="Add a new Dish"
				>
					<div className="flex flex-col gap-3  relative w-4/5 ">
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
						<div class="flex gap-10 relative top-1 justify-center items-center">
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
						<label
							onChange={handleFoodImage}
							className="w-30 mt-3 md:w-48 flex items-center px-4 m-auto bg-white rounded-md shadow-md tracking-wide  border border-blue cursor-pointer hover:bg-yellow-300 hover:text-white text-black ease-linear transition-all duration-150"
						>
							<CloudIcon />
							<span className="mt-1 text-base leading-normal">Upload File</span>
							<input type="file" className="hidden" name="foodPic" />
						</label>
						{previewSource && (
							<>
								<div className="p-2">
									<h3 className="bold text-base text-center">Image preview:</h3>
									<img
										src={previewSource}
										className="aspect-w-16 aspect-h-9 w-24 md:w-48 m-auto shadow-lg "
									/>
								</div>
							</>
						)}
						<button
							onClick={handleSubmit}
							class=" bg-green-500 text-lg px-8 py-2 relative  rounded-sm hover:bg-green-600 transition ease-in-out duration-300 text-white w-auto bottom-0"
						>
							Submit
						</button>
					</div>
				</Modal>
			)}
			{showCropperModal && (
				<CropImageModal
					mediaPreview={previewSource}
					media={media}
					aspectRatio="32/27"
					setMedia={setMedia}
					showModal={showCropperModal}
					handleFileChange={(val) => setMedia(val)}
					setpreviewSource={setpreviewSource}
					setShowModal={setShowCropperModal}
				/>
			)}
		</>
	);
};

export default SellerCategory;
