import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Common/Card";
import SearchCard from "../components/Common/SearchCard";
import Navbar from "../components/User/Navbar";
import SearchBar from "../components/User/SearchBar";
import { ReactComponent as SortIcon } from "../icons/sort-icon.svg";
import { Popover, Transition } from "@headlessui/react";
import ResultArea from "../components/User/ResultArea";

const Search = () => {
	const [sellers, setSellers] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [isClicked, setIsClicked] = useState(false);
	const [sortByCost, setSortByCost] = useState(false);
	const [sortByRating, setSortByRating] = useState(false);
	const [searches, setSearches] = useState([]);
	const suggestArea = document.querySelector("#suggest-area");
	let ResultData;
	useEffect(() => {
		if (suggestArea) {
			if (searchInput === "") {
				suggestArea.classList.add("hidden");
			} else {
				if (suggestArea.classList.contains("hidden"))
					suggestArea.classList.remove("hidden");
			}
		}
	}, [searchInput]);
	useEffect(async () => {
		const response = await fetch("/getSellers");
		const data = await response.json();
		console.log("seller data receieved", data);
		setSellers(data);
		setFiltered(data);
	}, []);

	const handleSearch = () => {
		setSearchInput("");

		const resultArea = document.getElementById("result-area");
		resultArea.classList.remove("hidden");
		setSearches([]);

		let matches = sellers.filter((seller) => {
			// const regex = new RegExp(`/${searchInput}/`, "gi");
			let stringToCheck = seller.restaurantName;
			let inp = searchInput.toLowerCase();
			if (stringToCheck.toLowerCase().includes(inp)) return true;
			return false;
		});
		if (searchInput == "") setFiltered([]);
		else setFiltered(matches);
	};
	const sortByRatingClicked = () => {
		const data = [...filtered];
		data.sort((a, b) => {
			if (a.overallRating.$numberDecimal === b.overallRating.$numberDecimal) {
				return a.costForTwo - b.costForTwo;
			}
			return b.overallRating.$numberDecimal - a.overallRating.$numberDecimal;
		});
		console.log("yoooooooooooo", data);
		setSortByRating(false);
		setFiltered(data);
	};
	const sortByCostClicked = () => {
		const data = [...filtered];
		data.sort((a, b) => {
			if (a.costForTwo === b.costForTwo) {
				if (a.overallRating.$numberDecimal === b.overallRating.$numberDecimal) {
					return a.restaurantName - b.restaurantName;
				}
				return a.overallRating.$numberDecimal - b.overallRating.$numberDecimal;
			}
			return a.costForTwo > b.costForTwo ? 1 : -1;
		});
		console.log("yoooooooooooo", data);
		setSortByCost(false);
		setFiltered(data);
	};
	useEffect(() => {
		let matches = sellers.filter((seller) => {
			// const regex = new RegExp(`^${searchInput}`, "gi");
			let stringToCheck = seller.restaurantName;
			let inp = searchInput.toLowerCase();
			if (stringToCheck.toLowerCase().includes(inp)) return true;
			return false;
		});
		setSearches(matches);
	}, [searchInput]);
	useEffect(() => {
		console.log("cjange", filtered);
	}, [filtered]);
	return (
		<>
			<Navbar />
			<div class="z-40 grid grid-cols-10 p-8 items-center gap-3 md:gap-x-10 w-full md:w-2/3 m-auto">
				<SearchBar
					onChange={(val) => {
						setSearchInput(val);
					}}
					handleClick={(val) => {
						handleSearch();
					}}
				/>

				<Popover className="relative">
					<Popover.Button>
						<div className="m-auto transition ease-in-out duration-300 p-2 hover:bg-black hover:bg-opacity-90 cursor-pointer rounded-md hover:text-white">
							<SortIcon />
						</div>
					</Popover.Button>
					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-50 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-50 opacity-0"
					>
						<Popover.Panel className="shadow-sm absolute right-0 z-50">
							<div className="grid grid-cols-1 md:w-60 w-48 shadow-lg divide-y-2 ">
								<div
									onClick={() => {
										setSortByRating(true);
										sortByRatingClicked();
									}}
									className="hover:bg-gray-200 transition ease-in-out duration-300 p-4 cursor-pointer col-span-1 bg-gray-50"
								>
									By Rating
								</div>
								<div
									onClick={() => {
										setSortByCost(true);
										sortByCostClicked();
									}}
									className="hover:bg-gray-200 transition ease-in-out duration-300 p-4 cursor-pointer  col-span-1 bg-gray-50"
								>
									By Cost
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
				<div
					id="suggest-area"
					className=" col-span-9 hidden min-h-auto max-h-72 overflow-y-auto shadow-lg bg-white"
				>
					{searches.map((seller) => {
						return (
							<Link to={`/sellerPage/${seller._id}`}>
								<SearchCard
									restaurantName={seller.restaurantName}
									imgUrl={seller.restaurantPic}
									sellerId={seller._id}
								/>
							</Link>
						);
					})}
				</div>
			</div>
			<ResultArea filtered={filtered} />
		</>
	);
};

export default Search;
