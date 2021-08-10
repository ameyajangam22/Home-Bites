import { useEffect, useState } from "react";
import { ReactComponent as LogoIcon } from "../../logo/hb-logo.svg";
const ContactSeller = ({ sellerId }) => {
	const [seller, setSeller] = useState([]);
	useEffect(async () => {
		const response = await fetch("/getSeller/" + sellerId);
		const data = await response.json();
		setSeller(data[0]);
	}, []);
	return (
		<>
			<div className="relative w-3/4 md:w-2/5 flex m-auto mt-20 md:mt-5 p-5  bg-gray-100 rounded-md shadow-4xl h-60">
				<div className="flex flex-col gap-4">
					<h2 className="font-bold">
						Seller Name:{" "}
						<span className="font-medium">{seller.sellerName}</span>
					</h2>
					<h2 className="font-bold">
						Seller Contact:{" "}
						<span className="font-medium">{seller.phoneNumber}</span>
					</h2>
					<div className="mt-auto relative left-0 w-20">
						<LogoIcon />
					</div>
				</div>
				<div className="flex flex-col ml-auto">
					<img
						src={seller.restaurantPic}
						className="h-2/4 md:h-2/3 ml-auto"
						alt=""
					/>
				</div>
			</div>
		</>
	);
};

export default ContactSeller;
