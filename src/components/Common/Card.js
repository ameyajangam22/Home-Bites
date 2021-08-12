import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "../../icons/star.svg";

const Card = (props) => {
	return (
		<>
			<div className="z-10 relative w-60 h-80 m-auto  p-2	rounded-md  hover:shadow-md flex flex-col justify-center items-center">
				<img
					src={props.imgUrl}
					style={{ aspectRatio: "127/80" }}
					className=" w-3/4 md:w-11/12	"
					alt="myidli"
				/>
				<div className=" px-1 py-4 w-full text-center">
					<div className="font-bold text-xl mb-2">{props.restaurantName}</div>
					<div className="grid grid-cols-2">
						<div className="flex flex-col">
							<div className="col-span-1 flex items-center gap-2  text-center">
								<div className="text-white">
									<StarIcon />
								</div>
								{props.overallRating.$numberDecimal}
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
					<Link to={`/sellerPage/${props.sellerId}`}>
						<div className="z-10 relative mt-7 bg-gray-50 p-2 cursor-pointer hover:bg-gray-100 transition ease-in-out duration-300">
							View Menu
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Card;
