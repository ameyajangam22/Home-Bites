import { useEffect, useState } from "react";
import BillingCard from "../components/User/BillingCard";
import Navbar from "../components/User/Navbar";
import StepComponent from "../components/User/StepComponent";

const Checkout = () => {
	const [finalAmount, setFinalAmount] = useState(0);
	const [showCart, setShowCart] = useState(false);
	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (data.user) {
			setShowCart(true);
		}
	}, []);
	return (
		<>
			<Navbar type="user" />
			<div className="z-9 grid grid-cols-2 md:grid-cols-12">
				<div
					id="details"
					className="z-0 relative col-span-2 md:col-span-7 lg:col-span-8  min-h-screen"
				>
					<StepComponent finalAmount={finalAmount} />
				</div>
				<div
					id="bill"
					className="col-span-2 p-2 md:col-span-5 lg:col-span-4 md:p-10  min-h-screen"
				>
					{showCart && localStorage.getItem("orders") && (
						<BillingCard
							finalAmount={finalAmount}
							setFinalAmount={setFinalAmount}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Checkout;
