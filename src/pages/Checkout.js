import BillingCard from "../components/User/BillingCard";
import Navbar from "../components/User/Navbar";
const Checkout = () => {
	return (
		<>
			<Navbar type="user" />
			<div className="z-9 grid grid-cols-2 md:grid-cols-12">
				<div
					id="details"
					className="z-0 relative col-span-2 md:col-span-7 lg:col-span-8 bg-red-300  h-screen"
				></div>
				<div
					id="bill"
					className="col-span-2 p-2 md:col-span-5 lg:col-span-4 md:p-10 bg-green-300 h-screen"
				>
					<BillingCard />
				</div>
			</div>
		</>
	);
};

export default Checkout;
