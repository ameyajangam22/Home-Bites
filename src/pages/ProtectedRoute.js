import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
const ProtectedRoute = ({
	isAuth: isAuth,
	redirect: redirectLink,
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth) {
					return <Component />;
				} else {
					toast("Not allowed. Logout as user first");
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
