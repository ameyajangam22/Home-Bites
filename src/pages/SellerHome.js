import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SellerNav from "../components/User/SellerNav";
import { toast } from "react-toastify";
import { ReactComponent as PlusIcon } from "../icons/plus-icon.svg";
import Modal from "../components/Common/Modal";
import SellerCategory from "../components/User/SellerCategory";
import CropImageModal from "../components/User/CropImageModal";
import { ReactComponent as StarIcon } from "../icons/star.svg";

const SellerHome = () => {
	const history = useHistory();
	const [userName, setUserName] = useState("Seller");
	const [restaurantPic, setRestaurantPic] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [newCategory, setNewcategory] = useState("");
	const [categories, setCategories] = useState([]);
	const [catUpdate, setCatUpdate] = useState(false);
	const [dishOrCatUpdate, setDishOrCatUpdate] = useState(false);
	const [restaurantName, setRestaurantName] = useState("");
	const [costForTwo, setCostForTwo] = useState(0);
	const [showTwoModal, setShowTwoModal] = useState(false);
	const [comments, setComments] = useState([]);
	const [rating, setRating] = useState(0);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewcategory(value);
	};
	const handleChange2 = (e) => {
		setCostForTwo(e.target.value);
	};
	const handleSubmit = async () => {
		// add category to DB with empty array
		const formData = new FormData();
		formData.append("categoryName", newCategory);
		const response = await fetch("/addCategory", {
			method: "POST",
			body: formData,
		});

		setShowModal(false);
		setCatUpdate(!catUpdate);
	};
	const handleSubmitTwo = async () => {
		const response = await fetch("/updateTwoPrice", {
			method: "POST",
			body: JSON.stringify({
				twoPrice: costForTwo,
			}),
			headers: {
				"content-type": "application/json",
			},
		});
		const data = await response.json();
		setShowTwoModal(false);
	};
	useEffect(async () => {
		const response2 = await fetch("/getCategories");
		const data2 = await response2.json();
		//
		setCategories(data2.info);
	}, [catUpdate, dishOrCatUpdate]);
	useEffect(async () => {
		const response = await fetch("/meSeller");
		const data = await response.json();

		if (data.message == "ok") {
			//
			setUserName(data.data.sellerName);
			setRestaurantPic(data.data.restaurantPic);
			setRestaurantName(data.data.restaurantName);
			setCostForTwo(data.data.costForTwo);

			const response2 = await fetch("/getComments/" + data.data._id);
			const data2 = await response2.json();
			setComments(data2);
			//
		} else {
			//
			localStorage.setItem("isSellerAuthenticated", "false");
			history.push("/sellerLogin");
			toast.error("Illegal login", {
				draggable: true,
			});
		}
		//
	}, []);
	useEffect(async () => {
		let rate = 0;
		comments.forEach((comment) => {
			rate += +comment.rating.$numberDecimal;
		});
		if (comments.length > 0) rate = rate / comments.length;

		setRating(rate.toFixed(1));
	}, [comments]);
	return (
		<>
			<SellerNav userName={userName} />

			<div className="flex bg-gray-900 p-5 md:p-10 gap-4  items-start">
				<img
					className="aspect-w-16 aspect-h-9 w-40 md:w-80"
					src={restaurantPic}
					alt="rest-pic"
				/>
				<div>
					<h1 className="font-bold text-2xl md:text-4xl text-white ">
						{restaurantName}
					</h1>
					<div className="flex flex-col md:flex-row gap-2  items-center md:items-end">
						<h1 className="mt-5 text-lg  md:text-2xl text-white">
							Cost For Two:<span className="ml-1">{costForTwo}</span>
						</h1>

						<button
							onClick={() => {
								setShowTwoModal(true);
							}}
							className="ml-4 px-4 py-1 transition ease-in-out duration-300 h-auto  text-green-600 border-2  bg-none border-green-600  hover:bg-green-600 hover:text-white"
						>
							Update
						</button>
					</div>
					<h1 className="mt-5 flex gap-3 items-center text-lg md:text-2xl text-white col-span-7">
						Rating:
						<span className="flex items-center gap-3">
							<StarIcon /> <span>{rating}</span>
						</span>
					</h1>
				</div>
			</div>
			<div className=" flex flex-col gap-10  rounded-md bg-gray-100 w-11/12 md:w-1/2 p-5 relative mt-4 m-auto">
				<div className="flex w-full justify-center items-center">
					<button
						onClick={() => {
							setShowModal(true);
						}}
						className=" p-3 flex gap-4 w-auto text-lg items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-200"
					>
						<PlusIcon></PlusIcon>
						Create a Category
					</button>
				</div>
				<div className="flex flex-col" id="menuArea">
					{categories.map((category) => {
						return (
							<SellerCategory
								key={category._id}
								dishes={category.dishes}
								categoryId={category._id}
								categoryName={category.categoryName}
								onChange={() => {
									setDishOrCatUpdate(!dishOrCatUpdate);
								}}
							/>
						);
					})}
				</div>
			</div>

			{/* MODAL */}
			{showModal && (
				<Modal
					showModal={showModal}
					onChange={(val) => {
						setShowModal(val);
					}}
					title="Create a Category"
				>
					<div className="flex flex-col w-4/5 ">
						<input
							className="border-2 px-2 mb-10 focus:border-blue-400 h-10 rounded-md outline-none shadow-sm"
							type="text"
							name="category-name"
							placeholder="Category Name"
							onChange={handleChange}
						/>
						<button
							onClick={handleSubmit}
							className=" bg-green-500 text-lg px-8 py-2  top-12 rounded-sm hover:bg-green-600 transition ease-in-out duration-300 text-white w-auto bottom-0"
						>
							Submit
						</button>
					</div>
				</Modal>
			)}
			{showTwoModal && (
				<Modal
					showModal={showTwoModal}
					onChange={(val) => {
						setShowTwoModal(val);
					}}
					title="Update Price For Two"
				>
					<div className="flex flex-col w-4/5 ">
						<input
							className="border-2 mb-10 px-2 focus:border-blue-400 h-10 rounded-md outline-none shadow-sm"
							type="number"
							name="twoPrice"
							placeholder="New Price"
							onChange={handleChange2}
						/>
						<button
							onClick={handleSubmitTwo}
							className=" bg-green-500 text-lg px-8 py-2  top-12 rounded-sm hover:bg-green-600 transition ease-in-out duration-300 text-white w-auto bottom-0"
						>
							Submit
						</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default SellerHome;
