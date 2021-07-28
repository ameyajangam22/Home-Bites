const Card = (props) => {
	return (
		<>
			<div className="w-96 h-96 m-auto p-10 rounded-md overflow-hidden hover:shadow-md flex flex-col justify-center items-center">
				<img src={props.imgUrl} class=" w-2/3 md:w-3/4 md:h-3/4" alt="myidli" />
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">{props.restaurantName}</div>
					<p className="text-gray-700 text-base">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Voluptatibus quia, nulla! Maiores et perferendis eaque,
						exercitationem praesentium nihil.
					</p>
				</div>
			</div>
		</>
	);
};

export default Card;
