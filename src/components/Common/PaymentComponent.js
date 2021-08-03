import { toast } from "react-toastify";
const PaymentComponent = ({ name, email, phoneNumber, finalAmount }) => {
	const displayRazorPay = async () => {
		const response = await fetch("/razorpay/" + finalAmount, {
			method: "POST",
		});
		const data = await response.json();
		var options = {
			key: "rzp_test_FltYRR43mVElxs", // Enter the Key ID generated from the Dashboard
			amount: finalAmount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency: data.currency,
			name: "Home Bites",
			description: "Homely Food is one step away",
			image:
				"https://res.cloudinary.com/home-bites/image/upload/v1628023938/Home-Bites-Logo-01_su24el.png",
			order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			handler: function (response) {
				alert(response.razorpay_payment_id);
				alert(response.razorpay_order_id);
				alert(response.razorpay_signature);
				toast.success("Payment Successful");
			},
			prefill: {
				name: name,
				email: email,
				contact: phoneNumber,
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};
	const loadRazorPay = () => {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		document.body.appendChild(script);
		script.onload = displayRazorPay;
	};
	return (
		<>
			<button
				onClick={loadRazorPay}
				className="bg-gradient-to-r from-blue-600  to-blue-900 px-10 py-3 text-white"
			>
				Pay Now
			</button>
		</>
	);
};

export default PaymentComponent;
