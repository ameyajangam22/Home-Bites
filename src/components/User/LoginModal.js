const LoginModal = (props) => {
	const handleState = (value) => {
		console.log("here");
		props.updateState(value);
	};

	return (
		<>
			<div className="top-20 flex justify-center overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none">
				{/*content*/}
				<div className="rounded-lg h-80 shadow-lg relative w-80 md:w-96 flex flex-col bg-white outline-none focus:outline-none">
					{/*header*/}
					<div className="border-0 flex items-center justify-center p-5 border-b border-solid  rounded-t">
						<h3 className="text-3xl font-semibold">Sign in</h3>
						<button
							className="absolute right-0 top-0 pt-3 pr-3 focus:outline-none"
							onClick={() => {
								handleState(false);
							}}
						>
							<span className=" text-3xl text-black h-6 w-6  block outline-none focus:outline-none">
								×
							</span>
						</button>
					</div>
					{/*body*/}
					<div className="relative p-6 flex h-40 justify-center items-center">
						<a
							href="http://localhost:8000/google"
							className=" w-4/5 flex p-1 bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-500 items-center absolute h-18 md:h-20 text-xl shadow-lg rounded-md"
						>
							<div className="bg-white  rounded-md p-3 flex justify-center items-center h-full overflow-hidden">
								<img
									src="https://img.icons8.com/color/48/000000/google-logo.png"
									alt="google-png"
								/>
							</div>
							<div className="text-white ml-10">Sign In</div>
						</a>
					</div>
				</div>
			</div>
			<div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
		</>
	);
};

export default LoginModal;
