import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Common/Card";
import SearchCard from "../components/Common/SearchCard";
import Navbar from "../components/User/Navbar";
import SearchBar from "../components/User/SearchBar";

const Search = () => {
	const [sellers, setSellers] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [isClicked, setIsClicked] = useState(false);
	const [searches, setSearches] = useState([]);
	const suggestArea = document.querySelector("#suggest-area");
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
	return (
		<>
			<Navbar />
			<div class="p-8 w-full md:w-2/3 m-auto">
				<SearchBar
					onChange={(val) => {
						setSearchInput(val);
					}}
					handleClick={(val) => {
						handleSearch();
					}}
				/>
				<div
					id="suggest-area"
					className="z-50 relative hidden min-h-auto max-h-72 overflow-y-auto shadow-lg bg-white"
				>
					{searches.map((seller) => {
						return (
							<Link
								to={{
									pathname: "/sellerPage",
									state: {
										sellerId: seller._id,
									},
								}}
							>
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
			<div
				id="result-area"
				className="z-10 relative hidden p-5 grid grid-cols-1 col-span-1 justify-between gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 "
			>
				{
					<>
						{filtered.length > 0 &&
							filtered.map((seller) => {
								return (
									<Card
										restaurantName={seller.restaurantName}
										imgUrl={seller.restaurantPic}
										reviews={seller.reviews}
										costForTwo={seller.costForTwo}
										sellerId={seller._id}
									/>
								);
							})}
					</>
				}
			</div>
		</>
	);
};

export default Search;
