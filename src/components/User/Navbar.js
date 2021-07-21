import { ReactComponent as Logo } from "../../logo/hb-logo.svg";
import { ReactComponent as CartIcon } from "../../icons/cart.svg";
import { ReactComponent as UserIcon } from "../../icons/signin.svg";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import { ReactComponent as LogOutIcon } from "../../icons/logout.svg";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Navbar = ({ type }) => {
	const [showModal, setShowModal] = useState(false);
	const [userName, setUserName] = useState("Anon");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showLinks, setShowLinks] = useState(true);
	useEffect(() => {
		if (type == "seller") {
			setShowLinks(false);
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
					const signIn = document.getElementById("sign-in");
					const logOut = document.getElementById("log-out");
					signIn.classList.add("hidden");
					logOut.classList.remove("hidden");
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
						<SearchIcon />
						<Link to="/search">Search</Link>
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
			)}
			{showModal && <LoginModal updateState={(value) => setShowModal(value)} />}
		</nav>
	);
};

export default Navbar;
