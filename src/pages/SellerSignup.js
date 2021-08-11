import { useState, useEffect } from "react";
import Navbar from "../components/User/Navbar";
import { ReactComponent as Logo } from "../logo/hb-logo.svg";
import { ReactComponent as CloudIcon } from "../icons/cloud-upload.svg";
import { ReactComponent as GearIcon } from "../icons/gear-icon.svg";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import scrollTo from "../scrollanimate";
import axios from "axios";
import CropImageModal from "../components/User/CropImageModal";
const myConfig = require("../myConfig");

const SellerSignup = () => {
	const history = useHistory();
	let submitbtn;
	useEffect(() => {}, []);
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const restaurantNameRegex = new RegExp("^[0-9A-Za-z_\\s.-]+$");
	const [seller, setSeller] = useState({
		sname: "",
		semail: "",
		spassword: "",
		sphone: "",
		srname: "",
	});
	const [errorText, setErrorText] = useState("");
	const [errorRestName, setErrorRestName] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [media, setMedia] = useState(null);
	const [previewSource, setpreviewSource] = useState(null);
	const [showGear, setShowGear] = useState(false);
	const [fileUploadText, setfileUploadText] = useState(
		"Upload your resto image"
	);
	const [buttonText, setButtonText] = useState("Submit");
	const [showModal, setShowModal] = useState(false);
	const { sname, semail, spassword, sphone, srname } = seller;

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setpreviewSource(reader.result);
			setfileUploadText("Change image");
		};
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setMedia(file);
		console.log("signupmedia", media);
		setShowModal(true);
		previewFile(file);
	};
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
		}
		if (name == "srname") {
			let isValid = true;
			isValid = restaurantNameRegex.test(value);
			if (value !== "" && !isValid) {
				setErrorRestName(
					"Only hyphens,spaces,periods and underscores are allowed"
				);
			} else {
				setErrorRestName("");
			}
		}

		setSeller((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(seller);
		// console.log(media);
		// console.log("submitmedia", media);
		setSubmitDisabled(true);
		setButtonText("Processing...");
		setShowGear(true);
		let formData = new FormData();

		formData.append("file", media);
		formData.append("upload_preset", "ml_default");
		formData.append("cloud_name", "home-bites");

		const errorMsg = await fetch(`/emailVerify/${semail}`);
		const data = await errorMsg.json();
		await setErrorText(data.message);

		const errorMsgRestName = await fetch(`/restNameVerify/${srname}`);
		const data2 = await errorMsgRestName.json();
		await setErrorRestName(data2.message);
		if (data.message == "" && data2.message == "") {
			const response = await axios.post(myConfig.CLOUDINARY_URL, formData);

			if (response) {
				console.log("Pic uploaded", response);

				let cloudinaryId = response.data.public_id;
				let img_url = response.data.secure_url;
				// console.log("img_url", img_url);

				const res = await fetch("/addSeller", {
					method: "POST",
					body: JSON.stringify({
						sname: sname,
						semail: semail,
						spassword: spassword,
						sphone: sphone,
						srname: srname,
						cloudinaryId: cloudinaryId,
						restaurantPic: img_url,
					}),
					headers: {
						"content-type": "application/json",
					},
				});
				history.push("/SellerLogin");
			}
		} else {
			scrollTo(100, 1000);
			setButtonText("Submit");
			setShowGear(false);
		}
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
		isSeller && isValid && media && errorRestName.length == 0
			? setSubmitDisabled(false)
			: setSubmitDisabled(true);
	}, [seller, media]);

	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		console.log("data recieved", data);
		if (data.user) {
			toast.error("Illegal Logout", {
				draggable: true,
			});
			history.push("/");
		}
	}, []);
	return (
		<>
			<Navbar type="seller" pg="signin" />
			<h2 className="text-2xl text-center mb-5 font-bold">
				Become a Seller Today!
			</h2>
			<div className="flex justify-center items-center">
				<Logo className="w-80" />
			</div>

			<form onSubmit={handleSubmit}>
				<div className=" top-12  h-full relative flex flex-col gap-4 justify-center p-12 w-full md:w-1/2 m-auto">
					<input
						type="text"
						name="sname"
						value={sname}
						className="border-2 p-2"
						placeholder="Name"
						onChange={handleChange}
						required
					/>

					<input
						type="email"
						name="semail"
						value={semail}
						className="border-2 p-2"
						placeholder="Email"
						onChange={handleChange}
						required
					/>
					<span className="text-red-500">{errorText}</span>
					<input
						type="password"
						name="spassword"
						className="border-2 p-2"
						value={spassword}
						placeholder="Password"
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="sphone"
						className="border-2 p-2"
						value={sphone}
						placeholder="Phone Number"
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="srname"
						value={srname}
						className="border-2 p-2"
						placeholder="Restaurant Name"
						onChange={handleChange}
						required
					/>
					<span className="text-red-500">{errorRestName}</span>
					<label className="w-30 md:w-2/3 flex flex-col items-center px-4 m-auto bg-white rounded-md shadow-md tracking-wide  border border-blue cursor-pointer hover:bg-yellow-300 hover:text-white text-black ease-linear transition-all duration-150">
						<CloudIcon />
						<span className="mt-2 text-base leading-normal">
							{fileUploadText}
						</span>
						<input
							type="file"
							className="hidden"
							name="restaurantPic"
							onChange={handleFileChange}
						/>
					</label>
					{previewSource && (
						<>
							<div className="p-2">
								<h3 className="bold text-base text-center">Image preview:</h3>
								<img
									src={previewSource}
									className="aspect-w-16 aspect-h-9 w-80 md:w-80 m-auto shadow-lg "
								/>
							</div>
						</>
					)}
					<button
						type="submit"
						id="submitbtn"
						className="flex justify-center items-center mt-5 disabled:opacity-50 p-2 rounded-md bg-yellow-200 w-full md:w-80 m-auto"
						disabled
					>
						{showGear && (
							<div id="gear">
								<GearIcon />
							</div>
						)}
						{buttonText}
					</button>
				</div>
			</form>
			{showModal && (
				<CropImageModal
					mediaPreview={previewSource}
					media={media}
					setMedia={setMedia}
					showModal={showModal}
					handleFileChange={(val) => setMedia(val)}
					setpreviewSource={setpreviewSource}
					setShowModal={setShowModal}
				/>
			)}
		</>
	);
};

export default SellerSignup;
