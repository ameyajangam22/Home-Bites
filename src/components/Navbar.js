import { ReactComponent as Logo } from "../logo/hb-logo.svg";
import { ReactComponent as CartIcon } from "../icons/cart.svg";
import { ReactComponent as UserIcon } from "../icons/signin.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as LogOutIcon } from "../icons/logout.svg";
import LoginModal from "./LoginModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Navbar = () => {
	const [showModal, setShowModal] = useState(false);
	const [userName, setUserName] = useState("Anon");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
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
					const signIn = document.getElementById("sign-in");
					const logOut = document.getElementById("log-out");
					signIn.classList.add("hidden");
					logOut.classList.remove("hidden");
				}
			});
	}, []);
	return (
		<nav className="mt-2 mb-2 flex items-center justify-between">
			<div className="w-44  md:ml-1">
				<Logo />
			</div>
			<div className="ml-9 gap-2 md:gap-10 flex mr-10  text-sm md:text-base">
				<p>Hello, {userName}!</p>
				<div className="flex gap-2">
					<SearchIcon />
					<a href="#">Search</a>
				</div>

				<div id="sign-in" className="flex gap-2">
					<UserIcon />
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

			{showModal && <LoginModal updateState={(value) => setShowModal(value)} />}
		</nav>
	);
};

export default Navbar;
