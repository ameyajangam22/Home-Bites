import { Transition } from "@headlessui/react";
import { Fragment } from "react";
const Modal = (props) => {
	const handleState = (value) => {
		props.onChange(value);
	};
	return (
		<>
			<div className="top-20 flex justify-center overflow-x-hidden  fixed inset-0  outline-none focus:outline-none">
				{/*content*/}

				<Transition appear show={props.showModal}>
					<Transition.Child
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="opacity-70 fixed inset-0  bg-black"></div>
					</Transition.Child>
					<Transition.Child
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-50"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="rounded-lg min-h-0 shadow-lg relative w-80 md:w-96 flex flex-col bg-white outline-none focus:outline-none	">
							{/*header*/}

							<div className="border-0 flex items-center justify-center p-5 border-b border-solid  rounded-t">
								<h3 className="text-2xl font-semibold">{props.title}</h3>
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
							<div className=" relative	 p-6 flex justify-center items-center">
								{props.children}
							</div>
						</div>
					</Transition.Child>
				</Transition>
			</div>
		</>
	);
};

export default Modal;
