import { ReactComponent as Logo } from "../logo/hb-logo.svg";
import { ReactComponent as CartIcon } from "../icons/cart.svg";
import { ReactComponent as UserIcon } from "../icons/signin.svg";
const Navbar = () => {
	return (
		<nav class="mt-2 mb-2 flex items-center justify-between">
			<div class="w-44 ml-1">
				<Logo />
			</div>
			<div class="gap-10 flex mr-10">
				<a href="">Search</a>
				<div class="flex gap-2">
					<UserIcon />
					<a href="">Sign in</a>
				</div>
				<div class="flex gap-2">
					<CartIcon />
					<a href="">Cart</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
