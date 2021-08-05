import { useEffect, useState } from "react";
import { ReactComponent as LockIcon } from "../../icons/lock.svg";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import PaymentComponent from "../Common/PaymentComponent";

const StepComponent = ({ finalAmount }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [step2, setStep2] = useState(false);
	const [errorPhone, setErrorPhone] = useState("");
	const [errorAddr, setErrorAddr] = useState("");
	const [uname, setUName] = useState("");
	const [email, setEmail] = useState("");
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name == "phoneNumber") {
			setPhoneNumber(value);
			// console.log("phone", phoneNumber);
		} else if (name == "address") {
			setAddress(value);
			// console.log("address", address);
		}
	};
	const handleSave = (e) => {
		if (phoneNumber.length == 10 && address !== "") {
			setStep2(true);
			const thirdStep = document.getElementById("thirdStep");
			thirdStep.style.opacity = "1";
			setErrorPhone("");
			setErrorAddr("");
		} else {
			setStep2(false);
			if (phoneNumber.length != 10 || phoneNumber.match(/^[0-9]+$/) == null) {
				setErrorPhone("Invalid Phone Number");
			}
			if (address === "") {
				setErrorAddr("Invalid Address");
			}
		}
	};
	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (data.user) {
			setIsLoggedIn(true);
			setEmail(data.user.email);
			setUName(data.user.displayName);
			const secondStep = document.getElementById("secondStep");
			secondStep.style.opacity = "1";
		} else {
			setIsLoggedIn(false);
		}
	}, []);
	return (
		<>
			<div className="relative flex flex-col md:px-20 justify-around mt-10 gap-20 w-full m-auto px-8 ">
				<div className=" relative bg-gray-50 shadow-2xl p-10  flex items-center">
					{isLoggedIn ? (
						<h2 className=" text-green-500 text-2xl  font-medium">
							Logged in !
						</h2>
					) : (
						<h2 className=" text-gray-700 text-2xl  font-medium">
							Please sign in to continue
						</h2>
					)}

					<div className="absolute right-10">
						{isLoggedIn ? <CheckIcon /> : <LockIcon />}
					</div>
				</div>
				<div
					id="secondStep"
					className=" relative opacity-50 bg-gray-50 shadow-2xl p-10 px-9 flex items-center"
				>
					<div className="relative flex flex-col gap-4">
						{isLoggedIn && step2 ? (
							<h2 className="text-green-500 text-2xl  font-medium">
								Mobile and Address updated!
							</h2>
						) : (
							<h2 className="text-gray-700 text-2xl  font-medium">
								Mobile and Address
							</h2>
						)}
						{isLoggedIn && (
							<>
								<input
									type="text"
									onChange={handleChange}
									placeholder="Phone Number"
									name="phoneNumber"
									className="shadow-inner p-2 w-3/4 md:w-full rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
								/>
								<span className="text-red-500">{errorPhone}</span>

								<textarea
									cols="50"
									rows="2"
									onChange={handleChange}
									style={{ resize: "none" }}
									placeholder="Address"
									name="address"
									className="shadow-inner p-2 w-3/4 md:w-full rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
								/>
								<span className="text-red-500">{errorAddr}</span>
								<button
									onClick={handleSave}
									className="bg-green-500 w-3/4 md:w-full py-2 rounded text-xl text-white"
								>
									Save
								</button>
							</>
						)}
					</div>
					<div className="absolute right-10">
						{!isLoggedIn && <LockIcon />}
						{isLoggedIn && step2 && <CheckIcon />}
					</div>
				</div>
				<div
					id="thirdStep"
					className=" relative opacity-50 bg-gray-50 shadow-2xl p-10 mb-10 px-9 flex items-center"
				>
					<div className="relative flex flex-col gap-4">
						<h2 className="text-gray-700 text-2xl  font-medium">Payment</h2>
						{isLoggedIn && step2 ? (
							<PaymentComponent
								uname={uname}
								email={email}
								phoneNumber={phoneNumber}
								finalAmount={finalAmount}
								customerAddr={address}
							/>
						) : (
							<></>
						)}
					</div>
					<div className="absolute right-10">
						{isLoggedIn && step2 ? <></> : <LockIcon />}
					</div>
				</div>
			</div>
		</>
	);
};

export default StepComponent;
