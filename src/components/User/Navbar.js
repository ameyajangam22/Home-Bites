import { ReactComponent as Logo } from "../../logo/hb-logo.svg";
import { ReactComponent as CartIcon } from "../../icons/cart.svg";
import { ReactComponent as UserIcon } from "../../icons/signin.svg";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import { ReactComponent as LogOutIcon } from "../../icons/logout.svg";
import { ReactComponent as LogInIcon } from "../../icons/login.svg";
import { ReactComponent as HamBurgerIcon } from "../../icons/hamBurger.svg";
import { ReactComponent as ThunderIcon } from "../../icons/thunder.svg";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import Modal from "../Common/Modal";
const Navbar = ({ type, pg, cartCount }) => {
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);
	const [userName, setUserName] = useState("Anon");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showLinks, setShowLinks] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const [sellerLogin, setSellerLogin] = useState(false);
	const [showSignIn, setShowSignIn] = useState(true);
	const [showLogout, setShowLogout] = useState(false);
	const [showMyOrders, setShowMyOrders] = useState(false);
	useEffect(() => {
		if (type === "seller") {
			setShowLinks(false);
			if (pg == "login") setSellerLogin(true);
			else setSellerLogin(false);
		} else {
			setShowLinks(true);
		}
	}, [type]);

	useEffect(() => {
		console.log("useEffect ran..");
		fetch("/me")
			.then((resp) => {
				return resp.json();
			})
			.then((data) => {
				if (data.user) {
					let str = data.user.displayName;
					const [firstName, secondName] = str.split(" ");
					setUserName(firstName);
					localStorage.setItem("isUserLoggedOut", false);
					const signIn = document.getElementById("sign-in");
					const logOut = document.getElementById("log-out");
					const myorders = document.getElementById("myOrders");

					setShowSignIn(false);
					setShowLogout(true);
					setShowMyOrders(true);
				} else {
					localStorage.setItem("isUserLoggedOut", true);
					setShowLogout(false);
					setShowSignIn(true);
					setShowMyOrders(false);
				}
			});
	}, []);
	return (
		<>
			<nav className="shadow-md mt-2 mb-2 overflow-x-hidden flex items-center justify-between">
				<div className="w-44  md:ml-1">
					<Link to="/">
						<Logo />
					</Link>
				</div>
				{showLinks && (
					<div
						id="links"
						className="ml-9 gap-4 md:gap-10 flex mr-10  text-sm md:text-base"
					>
						<p>Hello, {userName}!</p>

						<div className="hidden md:flex gap-2">
							<SearchIcon />
							<Link to="/search">Search</Link>
						</div>
						<div className="hidden md:flex gap-2">
							<UserIcon />
							<Link to="/sellerSignup">Become Seller</Link>
						</div>
						{showSignIn && (
							<div id="sign-in" className="hidden md:flex gap-2">
								<LogInIcon />
								<a
									href="#"
									onClick={() => {
										setShowModal(true);
									}}
								>
									Sign in
								</a>
							</div>
						)}

						{showMyOrders && (
							<div id="myOrders" className="hidden md:flex gap-2 ">
								<ThunderIcon />
								<a href="/userOrders">My Orders</a>
							</div>
						)}

						<div className="hidden md:flex gap-2">
							<div className="relative flex">
								<CartIcon />
								{cartCount > 0 && (
									<>
										<span class="animate-ping absolute right-0 top-0 rounded-full bg-green-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center"></span>
										<span class=" absolute right-0 top-0 rounded-full bg-green-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
											{cartCount}
										</span>
									</>
								)}
							</div>
							<a href="/checkout">Cart</a>
						</div>
						<div
							onClick={() => {
								setMenuOpen(!menuOpen);
							}}
							className="cursor-pointer md:hidden flex gap-2"
						>
							<HamBurgerIcon />
						</div>
						{showLogout && (
							<div id="log-out" className="md:flex gap-2 hidden">
								<LogOutIcon />
								<a href="http://localhost:8000/logout">Logout</a>
							</div>
						)}
					</div>
				)}
				{!showLinks && (
					<div className="ml-9 gap-2 md:gap-10 flex mr-10  text-sm md:text-base">
						<div className="flex gap-2">
							{!sellerLogin ? (
								<>
									<LogInIcon />
									<a href="/sellerLogin">Seller Login</a>
								</>
							) : (
								<>
									<UserIcon />
									<a href="/sellerSignup">Seller Signup</a>
								</>
							)}
						</div>
					</div>
				)}
				{showModal && (
					<Modal
						title="Sign in"
						showModal={showModal}
						onChange={(value) => setShowModal(value)}
					>
						<a
							href="http://localhost:8000/google"
							className=" mt-5 mb-20 relative bottom-2  w-4/5 flex p-1 bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-500 items-center h-18 md:h-20 text-xl shadow-lg rounded-md"
						>
							<div className=" bg-white  rounded-md p-3 flex justify-center items-center h-full overflow-hidden">
								<img
									src="https://img.icons8.com/color/48/000000/google-logo.png"
									alt="google-png"
								/>
							</div>
							<div className="text-white ml-10">Sign In</div>
						</a>
					</Modal>
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
				<a className=" hover:bg-gray-100" href="/search">
					<div className="flex gap-3">
						<SearchIcon />
						Search
					</div>
				</a>
				<a className="mt-3 hover:bg-gray-100" href="/sellerSignup">
					<div className="flex gap-3">
						<UserIcon />
						Become Seller
					</div>
				</a>
				{showSignIn && (
					<a
						className="mt-3 hover:bg-gray-100"
						href="http://localhost:8000/google"
					>
						<div className="flex gap-3">
							<LogInIcon />
							Sign in
						</div>
					</a>
				)}

				{showLogout && (
					<a
						className="mt-3 hover:bg-gray-100"
						href="http://localhost:8000/logout"
					>
						<div className="flex gap-3">
							<LogOutIcon />
							Logout
						</div>
					</a>
				)}

				{showMyOrders && (
					<a className="mt-3 hover:bg-gray-100" href="/userOrders">
						<div className="flex gap-3">
							<ThunderIcon />
							My Orders
						</div>
					</a>
				)}

				<a className="mt-3 hover:bg-gray-100" href="/checkout">
					<div className="relative flex gap-3">
						<CartIcon />
						{cartCount > 0 && (
							<>
								<span class="animate-ping absolute left-3 top-0 rounded-full bg-green-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center"></span>
								<span class=" absolute left-3 top-0 rounded-full bg-green-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
									{cartCount}
								</span>
							</>
						)}
						Cart
					</div>
				</a>
			</Menu>
		</>
	);
};

export default Navbar;
