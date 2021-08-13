import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";

const CommentComponent = (props) => {
	const history = useHistory();
	const handleDelete = async () => {
		const response = await fetch(
			"/deleteComment/" + props.sellerId + "/" + props.commentId
		);
		history.push("/sellerPage/" + props.sellerId);
		props.onDel();
		toast.success("Comment deleted successfully");
	};
	const [showModal, setShowModal] = useState(false);
	const handleReadMore = () => {
		setShowModal(true);
	};
	return (
		<>
			<div className="flex">
				<div className="relative w-11/12  md:w-3/4 shadow-lg truncate  mt-8 mx-auto bg-gray-100 p-2 md:p-4 ">
					<div className="flex flex-col">
						<div>
							<h2 className="text-sm md:text-md font-medium">
								{props.userName}
							</h2>
						</div>
						<div>
							{" "}
							<ReactStars
								count={5}
								value={+props.rating.$numberDecimal}
								edit={false}
								activeColor="#ffd700"
							/>
						</div>
						<div className="my-5 text-sm md:text-base truncate">
							{props.review}
						</div>
					</div>
					<div className=" flex justify-end gap-4">
						<button
							onClick={handleReadMore}
							className="p-2 rounded transition ease-in-out duration-300  hover:bg-blue-600 bg-blue-500 text-white"
						>
							Read More
						</button>
						{props.userEmail === props.userEmailCommented && (
							<button
								onClick={handleDelete}
								className="p-2 rounded transition ease-in-out duration-300  hover:bg-red-600 bg-red-500 text-white"
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</div>
			{showModal && (
				<Modal
					showModal={showModal}
					onChange={(val) => {
						setShowModal(val);
					}}
					title="Full Comment"
				>
					<div>
						<p className="break-all">{props.review}</p>
					</div>
				</Modal>
			)}
		</>
	);
};

export default CommentComponent;
