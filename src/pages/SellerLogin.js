import Navbar from "../components/User/Navbar";
import { ReactComponent as Logo } from "../logo/hb-logo.svg";
const SellerLogin = () => {
	return (
		<>
			<Navbar type="seller" />
			<h2 class="text-2xl text-center mb-2 font-bold">Welcome Back, Seller!</h2>
			<div class="flex justify-center items-center mb-12">
				<Logo class="w-80" />
			</div>
			<h2 class="text-3xl text-center font-bold">Login</h2>
			<form>
				<div class=" top-12  h-full relative flex flex-col gap-8 justify-center pb-8 w-4/5 md:w-2/6 m-auto">
					<input
						type="email"
						name="semail"
						class="border-2 p-2"
						placeholder="Email"
						required
					/>
					<input
						type="password"
						name="spassword"
						class="border-2 p-2"
						placeholder="Password"
						required
					/>
					<button class="mt-5 p-2 rounded-md bg-yellow-200 w-4/5 md:w-80 m-auto">
						Login
					</button>
				</div>
			</form>
		</>
	);
};

export default SellerLogin;
