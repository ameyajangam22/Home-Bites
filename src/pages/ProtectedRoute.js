import { Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const ProtectedRoute = ({
	redirect: redirectLink,
	component: Component,
	customMessage: customMessage,
	type: type,
	good: good,
	...rest
}) => {
	let isAuth;
	if (type === "user") {
		isAuth = localStorage.getItem("isUserLoggedOut");
		// console.log("isAuthB", isAuth);
	} else if (type === "seller") {
		isAuth = localStorage.getItem("isSellerAuthenticated");
	}
	// console.log("good",good);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth == "true") {
					return <Component />;
				} else {
					toast(customMessage);
					return (
						<Redirect
							to={{ pathname: redirectLink, state: { from: props.location } }}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
