import DishComponent from "./DishComponent";

const CategoryComponent = ({
	category,
	cartCount,
	setCartCount,
	restaurantName,
}) => {
	return (
		<>
			<div className="py-4">
				<div>
					<h2 className="mb-3 md:text-2xl font-bold">
						{category.categoryName}
					</h2>
				</div>
				<div>
					{category.dishes.map((dish) => {
						return (
							<DishComponent
								cartCount={cartCount}
								setCartCount={setCartCount}
								dish={dish}
								restaurantName={restaurantName}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default CategoryComponent;
