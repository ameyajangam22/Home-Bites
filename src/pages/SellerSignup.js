import { useState, useEffect } from "react";
import Navbar from "../components/User/Navbar";
import { ReactComponent as Logo } from "../logo/hb-logo.svg";
import { ReactComponent as CloudIcon } from "../icons/cloud-upload.svg";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import scrollTo from "../scrollanimate";
import CropImageModal from "../components/User/CropImageModal";
const SellerSignup = () => {
	const history = useHistory();
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
	const [media, setMedia] = useState(null);
	const [previewSource, setpreviewSource] = useState(null);
	const [fileUploadText, setfileUploadText] = useState(
		"Upload your resto image"
	);
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
			// fetch call to check if email is already registered or not [LEFT]
			//>>>HERE
		}
		setSeller((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(seller);
		// console.log(media);
		let formData = new FormData();

		formData.append("restaurantPic", media);
		const errorMsg = await fetch(`/emailVerify/${semail}`);
		const data = await errorMsg.json();
		await setErrorText(data.message);
		if (data.message == "") {
			fetch("/uploadPic", {
				method: "POST",
				body: formData,
			})
				.then((resp) => {
					return resp.json();
				})
				.then((data) => {
					// console.log("Pic uploaded", data);

					let cloudinaryId = data.public_id;
					let img_url = data.secure_url;
					console.log("img_url", img_url);

					fetch("/addSeller", {
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
					}).then(() => {
						history.push("/SellerLogin");
					});
				})
				.catch((err) => console.log(err));
		} else {
			scrollTo(100, 1000);
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
		isSeller && isValid && media
			? setSubmitDisabled(false)
			: setSubmitDisabled(true);
	}, [seller, media]);

	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		console.log("data recieved", data);
		if (data.user) {
			toast("Illegal Logout");
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
				<div className=" top-12  h-full relative flex flex-col gap-4 justify-center p-12 w-4/5 md:w-1/2 m-auto">
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
							{/* <button
								type="button"
								className="bg-blue-500 text-white p-2 w-48 m-auto"
								onClick={() => {
									setShowModal(true);
								}}
							>
								Crop Image
							</button> */}
						</>
					)}
					<button
						type="submit"
						id="submitbtn"
						className="mt-5 disabled:opacity-50 p-2 rounded-md bg-yellow-200 w-4/5 md:w-80 m-auto"
						disabled
					>
						Submit
					</button>
				</div>
			</form>
			{showModal && (
				<CropImageModal
					mediaPreview={previewSource}
					setMedia={setMedia}
					showModal={showModal}
					setpreviewSource={setpreviewSource}
					setShowModal={setShowModal}
				/>
			)}
		</>
	);
};

export default SellerSignup;
