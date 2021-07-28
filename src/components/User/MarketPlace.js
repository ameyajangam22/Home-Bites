import Card from "../Common/Card";

const MarketPlace = () => {
	const imgUrl = "https://source.unsplash.com/gFB1IPmH6RE/640x426";
	return (
		<>
			<div className="p-5 grid grid-cols-1 col-span-1 justify-between gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
				<Card imgUrl={imgUrl} restaurantName="My Idli" />
			</div>
		</>
	);
};

export default MarketPlace;
