const SearchCard = (props) => {
	return (
		<>
			<div className="border-b-2 w-full hover:bg-gray-200 transition ease-in-out duration-200 bg-white p-3 text-base text-black">
				<div class="flex items-center">
					<img
						className="aspect-w-1 aspect-h-1 w-24 h-24"
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
