import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../logo/hb-logo.svg";
import { ReactComponent as UserIcon } from "../../icons/signin.svg";
import { ReactComponent as LogOutIcon } from "../../icons/logout.svg";
import { useEffect, useState } from "react";
import { ReactComponent as CheckIcon } from "../../icons/check2.svg";
import { slide as Menu } from "react-burger-menu";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { ReactComponent as HamBurgerIcon } from "../../icons/hamBurger.svg";
const SellerNav = ({ userName }) => {
	const [showLinks, setShowLinks] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<>
			<nav className="shadow-md mt-2 mb-2 flex items-center overflow-x-hidden justify-between">
				<div className="w-44  md:ml-1">
					<Link to="/">
						<Logo />
					</Link>
				</div>
				{showLinks && (
					<div
						id="seller-links"
						className="ml-9 gap-4 md:gap-10 flex mr-10  text-sm md:text-base"
					>
						<p>Hello, {userName}!</p>
						<div
							onClick={() => {
								setMenuOpen(!menuOpen);
							}}
							className="cursor-pointer md:hidden flex gap-2"
						>
							<HamBurgerIcon />
						</div>
						<div className="hidden md:flex gap-2">
							<MenuIcon />
							<Link to="/seller">Menu</Link>
						</div>
						<div id="my-orders" className="hidden md:flex gap-2">
							<UserIcon />
							<Link to="/seller/myOrders">My Orders</Link>
						</div>
						<div id="my-orders" className="hidden md:flex gap-2">
							<CheckIcon />
							<Link to="/seller/completed">Completed Orders</Link>
						</div>
						<div id="seller-log-out" className="hidden md:flex gap-2">
							<LogOutIcon />
							<a href="http://localhost:8000/seller/logout">Logout</a>
						</div>
					</div>
				)}
			</nav>
			<Menu
				right
				width={"50%"}
				isOpen={menuOpen}
				customBurgerIcon={false}
				customCrossIcon={false}
				className="md:hidden bg-gray-50 p-3"
				overlayClassName="md:hidden"
			>
				<a className=" hover:bg-gray-100" href="/seller">
					<div className="flex gap-3">
						<MenuIcon />
						Menu
					</div>
				</a>
				<a className="mt-3 hover:bg-gray-100" href="/seller/myOrders">
					<div className="flex gap-3">
						<UserIcon />
						My Orders
					</div>
				</a>
				<a className="mt-3 hover:bg-gray-100" href="/seller/completed">
					<div className="flex gap-3">
						<CheckIcon />
						Completed Orders
					</div>
				</a>
				<a
					className="mt-3 hover:bg-gray-100"
					href="http://localhost:8000/seller/logout"
				>
					<div className="flex gap-3">
						<LogOutIcon />
						Logout
					</div>
				</a>
			</Menu>
		</>
	);
};

export default SellerNav;
