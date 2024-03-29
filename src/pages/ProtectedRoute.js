import { Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const ProtectedRoute = ({
	redirect: redirectLink,
	component: Component,
	customMessage: customMessage,
	type: type,
	...rest
}) => {
	let isAuth;
	if (type === "user") {
		isAuth = localStorage.getItem("isUserLoggedOut");
	} else if (type === "seller") {
		isAuth = localStorage.getItem("isSellerAuthenticated");
	} else if (type == "userOrders") {
		isAuth = localStorage.getItem("isUserLoggedOut");
		if (isAuth === "true") {
			isAuth = "false";
		} else {
			isAuth = "true";
		}
	}
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth == "true") {
					return <Component />;
				} else {
					toast.error(customMessage, {
						draggable: true,
					});
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
