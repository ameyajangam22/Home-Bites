import { useEffect } from "react";
import Card from "../Common/Card";

const ResultArea = ({ filtered }) => {
	return (
		<div
			id="result-area"
			className="relative z-20  hidden p-5 grid grid-cols-1 col-span-1 justify-between gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 "
		>
			{
				<>
					{filtered.length > 0 &&
						filtered.map((seller) => {
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
				</>
			}
		</div>
	);
};

export default ResultArea;
