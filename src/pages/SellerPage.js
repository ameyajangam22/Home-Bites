import { useEffect, useState } from "react";
import Navbar from "../components/User/Navbar";
import { Tab } from "@headlessui/react";
import SellerMenu from "../components/User/SellerMenu";
import CommentSection from "../components/User/CommentSection";
import ContactSeller from "../components/User/ContactSeller";

const SellerPage = (props) => {
	const [restaurantPic, setRestaurantPic] = useState("");
	const [restaurantName, setRestaurantName] = useState("");
	const [costForTwo, setCostForTwo] = useState("");
	const [menu, setMenu] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [comments, setComments] = useState([]);
	const [userEmail, setUserEmail] = useState("");
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}
	const fetchComments = async (sellerId) => {
		const response2 = await fetch("/getComments/" + sellerId);
		const data2 = await response2.json();
		data2.reverse();
		setComments(data2);
	};
	useEffect(async () => {
		const sellerId = props.history.location.state.sellerId;
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
						<div className="flex items-end">
							<h1 className="mt-5 text-lg md:text-2xl text-white col-span-7">
								Cost For Two:{costForTwo}
							</h1>
						</div>
						<h1 className="mt-5 text-lg md:text-2xl text-white col-span-7">
							Rating: 0.0
						</h1>
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
							<div className="px-10">
								<CommentSection
									sellerId={props.history.location.state.sellerId}
									comments={comments}
									handleUpdate={(sellerId) => {
										fetchComments(sellerId);
									}}
									userEmail={userEmail}
								/>
							</div>
						</Tab.Panel>
						<Tab.Panel>
							<ContactSeller />
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</>
	);
};

export default SellerPage;
