import { useState, useEffect } from "react";
import Navbar from "../components/User/Navbar";
import { ReactComponent as Logo } from "../logo/hb-logo.svg";

const SellerSignup = () => {
	let submitbtn;
	useEffect(() => {}, []);
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const [seller, setSeller] = useState({
		sname: "",
		semail: "",
		spassword: "",
		sphone: "",
		srname: "",
	});
	const [errorText, setErrorText] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const { sname, semail, spassword, sphone, srname } = seller;
	const handleChange = (e) => {
		const { name, value, files } = e.target;
		let isValid = true;
		if (name === "semail") {
			isValid = emailRegex.test(value);
			if (value !== "" && !isValid) {
				setErrorText("Invalid email");
			} else {
				setErrorText("");
			}
			// fetch call to check if email is already registered or not [LEFT]
			//>>>HERE
		}
		setSeller((prev) => ({ ...prev, [name]: value }));
		console.log(seller);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	useEffect(() => {
		submitbtn = document.getElementById("submitbtn");
		submitbtn.disabled = submitDisabled;
	}, [submitDisabled]);

	useEffect(() => {
		//isSeller basically checks if all the fields are set or not
		const isSeller = Object.values({
			sname,
			semail,
			spassword,
			sphone,
			srname,
		}).every((item) => Boolean(item));
		let isValid = emailRegex.test(semail);
		isSeller && isValid ? setSubmitDisabled(false) : setSubmitDisabled(true);
	}, [seller]);
	return (
		<>
			<Navbar type="seller" />
			<h2 class="text-2xl text-center mb-5 font-bold">
				Become a Seller Today!
			</h2>
			<div class="flex justify-center items-center">
				<Logo class="w-80" />
			</div>

			<form onSubmit={handleSubmit}>
				<div class=" top-12  h-full relative flex flex-col gap-4 justify-center p-8 w-4/5 m-auto">
					<input
						type="text"
						name="sname"
						value={sname}
						class="border-2 p-2"
						placeholder="Name"
						onChange={handleChange}
						required
					/>

					<input
						type="email"
						name="semail"
						value={semail}
						class="border-2 p-2"
						placeholder="Email"
						onChange={handleChange}
						required
					/>
					<span class="text-red-500">{errorText}</span>
					<input
						type="password"
						name="spassword"
						class="border-2 p-2"
						value={spassword}
						placeholder="Password"
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="sphone"
						class="border-2 p-2"
						value={sphone}
						placeholder="Phone Number"
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="srname"
						value={srname}
						class="border-2 p-2"
						placeholder="Restaurant Name"
						onChange={handleChange}
						required
					/>
					<button
						id="submitbtn"
						class="mt-5 disabled:opacity-50 p-2 rounded-md bg-yellow-200 w-4/5 md:w-80 m-auto"
						disabled
					>
						Submit
					</button>
				</div>
			</form>
		</>
	);
};

export default SellerSignup;
