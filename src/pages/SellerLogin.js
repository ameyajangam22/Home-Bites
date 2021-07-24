import { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/User/Navbar";
import { ReactComponent as Logo } from "../logo/hb-logo.svg";
const SellerLogin = () => {
	const history = useHistory();
	const errordiv = document.querySelector("#errorspan");
	const [emailId, setEmailId] = useState();
	const [password, setPassword] = useState();
	const [errorText, setErrorText] = useState();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("semail", emailId);
		formData.append("spassword", password);

		const response = await fetch("/authLogin", {
			body: formData,
			method: "POST",
		});
		const data = await response.json();
		console.log("msg", data.message);
		if (data.message == "ok") {
			// do something like save session in backend
			// redirect to seller Dashboard
			history.push("/seller");
		} else {
			// we will have to set some error like the
			// email or password is incorrect
			setErrorText(data.message);
			errordiv.classList.remove("hidden");
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name == "semail") {
			setEmailId(value);
		} else if (name == "spassword") {
			setPassword(value);
		}
	};
	return (
		<>
			<Navbar type="seller" />
			<h2 className="text-2xl text-center mb-2 font-bold">
				Welcome Back, Seller!
			</h2>
			<div className="flex justify-center items-center mb-12">
				<Logo className="w-80" />
			</div>
			<h2 className="text-3xl text-center font-bold">Login</h2>
			<form onSubmit={handleSubmit}>
				<div className=" top-12  h-full relative flex flex-col gap-8 justify-center pb-8 w-4/5 md:w-2/6 m-auto">
					<input
						type="email"
						name="semail"
						value={emailId}
						className="border-2 p-2"
						placeholder="Email"
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="spassword"
						value={password}
						className="border-2 p-2"
						placeholder="Password"
						onChange={handleChange}
						required
					/>
					<span
						id="errorspan"
						className="bg-red-500 hidden w-full text-center p-3 rounded-md text-white m-auto"
					>
						{errorText}
					</span>
					<button className="mt-5 p-2 rounded-md bg-yellow-200 w-4/5 md:w-80 m-auto">
						Login
					</button>
				</div>
			</form>
		</>
	);
};

export default SellerLogin;
