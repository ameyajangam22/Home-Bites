import AddComment from "../Common/AddComment";

const CommentSection = ({ sellerId }) => {
	return (
		<>
			<AddComment sellerId={sellerId} />
		</>
	);
};

export default CommentSection;
