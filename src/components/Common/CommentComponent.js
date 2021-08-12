import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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
	useEffect(() => {
		console.log(props);
		console.log("MA NEW RATING", +props.rating.$numberDecimal);
	}, []);
	return (
		<>
			<div className="flex">
				<div className="relative w-3/4 shadow-lg truncate  mt-8 mx-auto bg-gray-100 p-2 md:p-4 ">
					<div className="flex flex-col">
						<div>
							<h2 className="text-md font-medium">{props.userName}</h2>
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
						<div>{props.review}</div>
					</div>
					<div className="flex justify-end">
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
		</>
	);
};

export default CommentComponent;
