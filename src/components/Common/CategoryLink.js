const CategoryLink = (props) => {
	return (
		<>
			<div className="text-sm md:text-base p-2 flex justify-end px-7 font-medium ">
				{props.children}
			</div>
		</>
	);
};

export default CategoryLink;
