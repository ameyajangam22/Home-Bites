import CategoryLink from "../Common/CategoryLink";
import CategoryComponent from "../Common/CategoryComponent";
const SellerMenu = ({ menu, cartCount, setCartCount, restaurantName }) => {
	// console.log(menu);
	return (
		<>
			<div class="grid grid-cols-3">
				<div
					id="categories"
					className=" overflow-y-auto hidden col-span-1 border-r-2 md:col-span-1 md:block"
				>
					{menu.map((item) => {
						return <CategoryLink>{item.categoryName}</CategoryLink>;
					})}
				</div>
				<div
					id="myMenu"
					className="divide-y-2 overflow-y divide-gray-300 black col-span-3 w-full px-3 md:col-span-2 md:px-16"
				>
					{menu.map((category) => {
						return (
							<CategoryComponent
								cartCount={cartCount}
								setCartCount={setCartCount}
								category={category}
								restaurantName={restaurantName}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default SellerMenu;
