import { useEffect, useState } from "react";
import Navbar from "../components/User/Navbar";
import { Tab } from "@headlessui/react";
import SellerMenu from "../components/User/SellerMenu";
import CommentSection from "../components/User/CommentSection";
import ContactSeller from "../components/User/ContactSeller";
import { ReactComponent as StarIcon } from "../icons/star.svg";
import { useParams } from "react-router-dom";

const SellerPage = (props) => {
	const params = useParams();
	const [restaurantPic, setRestaurantPic] = useState("");
	const [restaurantName, setRestaurantName] = useState("");
	const [costForTwo, setCostForTwo] = useState("");
	const [menu, setMenu] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [comments, setComments] = useState([]);
	const [commentsUpdated, setCommentsUpdated] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [rating, setRating] = useState(0);
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}
	const fetchComments = async (sellerId) => {
		const response2 = await fetch("/getComments/" + sellerId);
		const data2 = await response2.json();
		data2.reverse();
		setComments(data2);
		setCommentsUpdated(false);
	};
	useEffect(async () => {
		const sellerId = params.sellerId;
		const response = await fetch(`/getSeller/${sellerId}`);
		const data = await response.json();
		setRestaurantName(data[0].restaurantName);
		setRestaurantPic(data[0].restaurantPic);
		setCostForTwo(data[0].costForTwo);
		setMenu(data[0].menu);
		// console.log(data);

		fetchComments(sellerId);
	}, []);
	useEffect(async () => {
		const resp = await fetch("/me");
		const data = await resp.json();
		console.log("newData", data);
		// SAVE SESSION KARNA HAI IDHAR LOCAL STORAGEEE
		if (!data.user) localStorage.setItem("orders", []);
		else {
			let cartFetchcounter = 0;
			setUserEmail(data.user.email);
			if (localStorage.getItem("orders")) {
				let orders = JSON.parse(localStorage.getItem("orders"));
				orders.forEach((order) => (cartFetchcounter += order.count));
				setCartCount(cartFetchcounter);
			}
		}
	}, []);
	useEffect(async () => {
		let rate = 0;
		comments.forEach((comment) => {
			rate += +comment.rating.$numberDecimal;
		});
		if (comments.length > 0) rate = rate / comments.length;

		setRating(rate.toFixed(1));
		rate = rate.toFixed(1);
		let formData = new FormData();
		formData.append("sellerId", params.sellerId);
		formData.append("overallRating", rate);
		const response2 = await fetch("/updateOverallRating", {
			method: "POST",
			body: formData,
		});
		console.log("UPDATED COMMENTS", comments);
	}, [comments]);
	return (
		<>
			<div className="overflow-x-hidden">
				<Navbar cartCount={cartCount} />
				<div className="flex bg-gray-900 px-3 py-4 md:p-10 w-full items-start gap-10">
					<img
						className="aspect-w-16 aspect-h-9 w-32 md:w-80 md:col-span-3"
						src={restaurantPic}
						alt="rest-pic"
					/>
					<div>
						<h1 className="font-bold text-3xl md:text-4xl text-white col-span-7">
							{restaurantName}
						</h1>
						<div className="mt-10 grid grid-cols-2 items-center justify-center divide-x-2 ">
							<div className="text-center text-lg md:text-xl pr-6 text-white col-span-1">
								<h2>₹ {costForTwo}</h2>
								<span className="font-bold uppercase text-gray-300 text-xs">
									Cost For Two
								</span>
							</div>

							<div className="text-center text-lg md:text-xl pl-6 text-white col-span-1">
								<div className="flex items-center gap-2">
									<StarIcon />
									<h2>{rating}</h2>
								</div>
								<span className="font-bold uppercase text-gray-300 text-xs">
									Rating
								</span>
							</div>
						</div>
					</div>
				</div>
				<Tab.Group>
					<Tab.List className=" flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
						<Tab
							className={({ selected }) =>
								classNames(
									"w-full py-2.5 text-lg leading-5 font-medium text-blue-700 rounded-lg",
									"focus:outline-none",
									selected
										? "transition ease-out duration-300 border-b-4 border-blue-400 bg-white shadow"
										: "   text-blue-400 hover:bg-white/[0.12] hover:text-blue-500"
								)
							}
						>
							Menu
						</Tab>
						<Tab
							className={({ selected }) =>
								classNames(
									"w-full py-2.5 text-lg leading-5 font-medium text-blue-700 rounded-lg",
									"focus:outline-none",
									selected
										? "transition ease-out duration-300 border-b-4 border-blue-400 bg-white shadow"
										: "text-blue-100 hover:bg-white/[0.12] hover:text-blue-500"
								)
							}
						>
							Reviews
						</Tab>
						<Tab
							className={({ selected }) =>
								classNames(
									"w-full py-2.5 text-lg leading-5 font-medium text-blue-700 rounded-lg",
									"focus:outline-none",
									selected
										? "transition ease-out duration-300 border-b-4 border-blue-400 bg-white shadow"
										: "text-blue-100 hover:bg-white/[0.12] hover:text-blue-500"
								)
							}
						>
							Contact Seller
						</Tab>
					</Tab.List>
					<Tab.Panels>
						<Tab.Panel>
							<SellerMenu
								cartCount={cartCount}
								setCartCount={setCartCount}
								menu={menu}
								restaurantName={restaurantName}
							/>
						</Tab.Panel>
						<Tab.Panel>
							<div className="px-3 md:px-10">
								<CommentSection
									key={params.sellerId}
									sellerId={params.sellerId}
									comments={comments}
									handleUpdate={(sellerId) => {
										setCommentsUpdated(true);
										fetchComments(sellerId);
									}}
									userEmail={userEmail}
								/>
							</div>
						</Tab.Panel>
						<Tab.Panel>
							<ContactSeller sellerId={params.sellerId} />
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</>
	);
};

export default SellerPage;
