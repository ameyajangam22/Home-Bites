import Card from "../Common/Card";

const MarketPlace = () => {
	const imgUrl = "https://source.unsplash.com/gFB1IPmH6RE/640x426";
	return (
		<>
			<div className=" grid grid-cols-1 mt-3  md:p-5 justify-evenly items-center  gap-5 lg:grid-cols-4 ">
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
				<Card imgUrl={imgUrl} className="col-span-1" restaurantName="My Idli" />
			</div>
		</>
	);
};

export default MarketPlace;
