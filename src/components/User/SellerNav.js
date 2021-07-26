import LoginModal from "./LoginModal";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../logo/hb-logo.svg";
import { ReactComponent as UserIcon } from "../../icons/signin.svg";
import { ReactComponent as LogOutIcon } from "../../icons/logout.svg";
import { useEffect, useState } from "react";
const SellerNav = ({userName}) => {
	const[showLinks,setShowLinks]=useState(true);
    return ( <> 
    <nav className="shadow-md mt-2 mb-2 flex items-center justify-between">
			<div className="w-44  md:ml-1">
				<Link to="/">
					<Logo />
				</Link>
			</div>
			{showLinks && (
				<div
					id="seller-links"
					className="ml-9 gap-2 md:gap-10 flex mr-10  text-sm md:text-base"
				>
					<p>Hello, {userName}!</p>
					
					<div className="flex gap-2">
						<UserIcon />
						<Link to="/seller">Menu</Link>
					</div>
					<div id="my-orders" className="flex gap-2">
						<UserIcon />
						<Link to="/seller/myOrders">My Orders</Link>
					</div>
					
					<div id="seller-log-out" className="flex gap-2">
						<LogOutIcon />
						<a href="http://localhost:8000/seller/logout">Logout</a>
					</div>
				</div>
			)}
		</nav>
    
    </> );
}
 
export default SellerNav;