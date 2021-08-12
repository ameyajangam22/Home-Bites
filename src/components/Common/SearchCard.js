const SearchCard = (props) => {
	return (
		<>
			<div className="relative border-b-2 w-full hover:bg-gray-200 transition ease-in-out duration-200 bg-white p-3 text-base text-black">
				<div class=" flex items-center">
					<img
						className="w-24 rounded-md"
						style={{
							aspectRatio: "127/80",
						}}
						src={props.imgUrl}
						alt="resto-pic"
					/>
					<div class="ml-5 w-4/5">
						<h1 className="text-lg">{props.restaurantName}</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchCard;
