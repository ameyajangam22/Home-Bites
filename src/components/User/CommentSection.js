import { useEffect, useState } from "react";
import AddComment from "../Common/AddComment";
import ReactPaginate from "react-paginate";
import CommentComponent from "../Common/CommentComponent";

const CommentSection = ({ sellerId, comments, handleUpdate, userEmail }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const commentsPerPage = 5;
	// const [commentsRead, setCommentsRead] = useState(0);
	const commentsRead = pageNumber * commentsPerPage;
	const displayComments = comments.slice(
		commentsRead,
		commentsRead + commentsPerPage
	);

	const changePage = ({ selected }) => {
		console.log("selected", selected);
		setPageNumber(selected);
	};
	useEffect(async () => {
		const count = Math.ceil(comments.length / commentsPerPage);
		setPageCount(count);
		// fetchNewComments();
	}, []);

	return (
		<>
			<AddComment
				handleAdd={() => {
					handleUpdate(sellerId);
				}}
				sellerId={sellerId}
			/>

			<div
				id="commentsArea"
				className="mt-6 border-4 mb-10 flex flex-col w-full pb-10"
				style={{ minHeight: "30rem" }}
			>
				<h2 className="flex px-2 w-full justify-center text-2xl font-bold  ">
					Comments
				</h2>
				{displayComments.map((comment) => {
					return (
						<CommentComponent
							userEmail={userEmail}
							userEmailCommented={comment.userEmail}
							userName={comment.userName}
							rating={comment.rating.$numberDecimal}
							review={comment.review}
							commentId={comment._id}
							sellerId={sellerId}
							onDel={() => {
								handleUpdate(sellerId);
							}}
						/>
					);
				})}
			</div>
			{comments.length >= commentsPerPage && (
				<ReactPaginate
					pageCount={pageCount}
					onPageChange={changePage}
					breakLabel={"..."}
					breakClassName={"break-me"}
					previousLabel={"Prev"}
					nextLabel={"Next"}
					containerClassName={"flex gap-4 justify-center items-center mb-10"}
					previousLinkClassName={"border-2 p-2 rounded bg-gray-800 text-white "}
					nextLinkClassName={"border-2 p-2 rounded bg-gray-800 text-white "}
					disabledClassName={"paginationDisabled"}
					activeClassName={"border-2 px-4 py-2 rounded bg-gray-700 text-white "}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
				></ReactPaginate>
			)}
		</>
	);
};

export default CommentSection;
