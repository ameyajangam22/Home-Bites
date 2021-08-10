import { useEffect, useState } from "react";
import { ReactComponent as StarIcon } from "../../icons/star.svg";
const Card = (props) => {
	const [rating, setRating] = useState(0);
	useEffect(() => {
		let rate = 0;
		let comments = props.reviews;
		console.log(comments);
		if (comments) {
			comments.forEach((comment) => {
				rate += +comment.rating.$numberDecimal;
			});
			if (comments.length > 0) rate = rate / comments.length;

			setRating(rate.toFixed(1));
		}
	}, []);
	return (
		<>
			<div className="w-60 h-80  p-1 rounded-md overflow-hidden hover:shadow-md flex flex-col justify-center items-center">
				<img
					src={props.imgUrl}
					style={{ aspectRatio: "127/80" }}
					className=" w-3/4 md:w-11/12	"
					alt="myidli"
				/>
				<div className="px-1 py-4 w-full text-center">
					<div className="font-bold text-xl mb-2">{props.restaurantName}</div>
					<div className="grid grid-cols-2">
						<div className="flex flex-col">
							<div className="col-span-1 flex items-center gap-2  text-center">
								<div className="text-white">
									<StarIcon />
								</div>
								{rating}
							</div>
							<div className="flex text-gray-500 uppercase text-xs text-center">
								Rating
							</div>
						</div>
						<div className="col-span-1 text-center ">
							₹ {props.costForTwo}
							<h2 className="text-gray-500 uppercase text-xs">Cost For Two</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
