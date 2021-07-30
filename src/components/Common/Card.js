const Card = (props) => {
	return (
		<>
			<div className="w-72 h-96 m-auto p-4 rounded-md overflow-hidden hover:shadow-md flex flex-col justify-center items-center">
				<img
					src={props.imgUrl}
					style={{ aspectRatio: "127/80" }}
					class=" w-3/4 md:w-11/12	"
					alt="myidli"
				/>
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
