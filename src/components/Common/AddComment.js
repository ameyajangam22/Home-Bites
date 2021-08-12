import { useEffect, useState } from "react";
import Modal from "./Modal";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddComment = ({ handleAdd, sellerId }) => {
	const history = useHistory();
	const [rating, setRating] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [comment, setComment] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(false);
	const handleChange = (e) => {
		setComment(e.target.value);
	};
	const handleSubmit = async () => {
		let formData = new FormData();
		setSubmitDisabled(true);
		console.log("WHAT WAS THE RATING", rating);
		formData.append("sellerId", sellerId);
		formData.append("rating", rating);
		formData.append("comment", comment);
		const response = await fetch("/addComment", {
			method: "POST",
			body: formData,
		});
		setShowModal(false);
		setSubmitDisabled(false);

		handleAdd();
		history.push("/sellerPage/" + sellerId);
	};
	const handleAuth = async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (!data.user) {
			history.push("/search");
			toast.error("Login as seller first");
		}
		setShowModal(true);
	};
	useEffect(() => {
		let submitbtn = document.getElementById("submitCom");
		if (submitbtn) submitbtn.disabled = submitDisabled;
	}, [submitDisabled]);
	return (
		<>
			<div className="flex justify-center mt-8">
				<button
					onClick={() => {
						handleAuth();
					}}
					className=" bg-green-600 rounded hover:bg-green-700 transition ease-in-out duration-300 px-4 py-2 text-white "
				>
					Add Comment
				</button>
			</div>
			{showModal && (
				<Modal
					showModal={showModal}
					onChange={(val) => {
						setShowModal(val);
					}}
					title="Add a Review"
				>
					<div className="flex flex-col gap-3 pb-10 relative w-full ">
						<div className="m-auto">
							<ReactStars
								count={5}
								onChange={(val) => {
									setRating(val);
									console.log(rating);
								}}
								size={50}
								activeColor="#ffd700"
							/>
						</div>
						<textarea
							onChange={handleChange}
							name="textarea1"
							rows="3"
							placeholder="Leave a review.."
							className="shadow-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
						></textarea>
						<button
							id="submitCom"
							onClick={handleSubmit}
							className="disabled:opacity-40 bg-green-500 p-2 mt-4 text-white rounded hover:bg-green-600 transition ease-in-out duration-300 "
						>
							Submit
						</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default AddComment;
