import { ReactComponent as Logo } from "../../logo/hb-logo.svg";
import { ReactComponent as CartIcon } from "../../icons/cart.svg";
import { ReactComponent as UserIcon } from "../../icons/signin.svg";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import { ReactComponent as LogOutIcon } from "../../icons/logout.svg";
import { ReactComponent as LogInIcon } from "../../icons/login.svg";
import LoginModal from "./LoginModal";

import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
const Navbar = ({ type, pg }) => {
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);
	const [userName, setUserName] = useState("Anon");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showLinks, setShowLinks] = useState(true);
	const [sellerLogin, setSellerLogin] = useState(false);
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
					if (signIn) signIn.classList.add("hidden");
					if (logOut) logOut.classList.remove("hidden");
				} else {
					localStorage.setItem("isUserLoggedOut", true);
				}
			});
	}, []);
	return (
		<nav className="shadow-md mt-2 mb-2 flex items-center justify-between">
			<div className="w-44  md:ml-1">
				<Link to="/">
					<Logo />
				</Link>
			</div>
			{showLinks && (
				<div
					id="links"
					className="ml-9 gap-2 md:gap-10 flex mr-10  text-sm md:text-base"
				>
					<p>Hello, {userName}!</p>
					<div className="flex gap-2">
						<UserIcon />
						{/* <button onClick={handleSeller}>Become Seller</button> */}
						<Link to="/sellerSignup">Become Seller</Link>
					</div>
					<div className="flex gap-2">
						<SearchIcon />
						<Link to="/search">Search</Link>
					</div>
					<div id="sign-in" className="flex gap-2">
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
					<div className="flex gap-2">
						<CartIcon />
						<a href="#">Cart</a>
					</div>
					<div id="log-out" className="flex gap-2 hidden">
						<LogOutIcon />
						<a href="http://localhost:8000/logout">Logout</a>
					</div>
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
			{showModal && <LoginModal updateState={(value) => setShowModal(value)} />}
		</nav>
	);
};

export default Navbar;
