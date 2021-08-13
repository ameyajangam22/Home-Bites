import { useEffect, useState } from "react";
import Card from "../Common/Card";

const MarketPlace = () => {
	const [sellers, setSellers] = useState([]);
	useEffect(async () => {
		const response = await fetch("/getSellers");
		const data = await response.json();
		setSellers(data);
	}, []);
	const imgUrl = "https://source.unsplash.com/gFB1IPmH6RE/640x426";
	return (
		<>
			<h2 className="p-2 text-center  text-2xl md:text-4xl font-bold bg-gray-900 text-white mt-4 w-3/4 md:w-1/3 m-auto rounded-md">
				Our Sellers
			</h2>
			<div className=" grid grid-cols-1 mt-3  md:p-5 justify-evenly items-center  gap-5 lg:grid-cols-4 ">
				{sellers.map((seller) => {
					return (
						<Card
							key={seller._id}
							restaurantName={seller.restaurantName}
							imgUrl={seller.restaurantPic}
							reviews={seller.reviews}
							costForTwo={seller.costForTwo}
							sellerId={seller._id}
							overallRating={seller.overallRating}
						/>
					);
				})}
			</div>
		</>
	);
};

export default MarketPlace;
