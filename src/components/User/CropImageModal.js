import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Cropper from "react-cropper";

const CropImageModal = ({
	mediaPreview,
	setMedia,
	setpreviewSource,
	showModal,
	setShowModal,
}) => {
	const [cropper, setCropper] = useState();
	const getCropData = () => {
		if (cropper) {
			setMedia(cropper.getCroppedCanvas().toDataURL());
			setpreviewSource(cropper.getCroppedCanvas().toDataURL());
			cropper.destroy();
		}
		setShowModal(false);
	};
	return (
		<>
			<Transition appear show={showModal} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={() => {
						setShowModal(false);
					}}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-50"
							leave="ease-in duration-200"
							leaveFrom="opacity-50"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className=" opacity-70 bg-black fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-75"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-auto p-6 my-8   transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-xl font-bold leading-6 text-gray-900"
								>
									Crop image before upload{" "}
									<span class="text-red-500 ml-2 ">[Recommended]</span>
								</Dialog.Title>
								<h2 class=" hidden font-medium md:block text-lg relative left-52 top-8 ">
									Preview
								</h2>
								<div className="mt-2  gap-4  grid grid-cols-1 md:grid-cols-2">
									<div className="flex col-span-1 justify-center items-center max-w-sm md:w-full">
										<Cropper
											cropBoxResizable={false}
											zoomable
											highlight
											responsive={false}
											guides
											dragMode="move"
											initialAspectRatio={127 / 80}
											aspectRatio={127 / 80}
											preview=".img-preview"
											src={mediaPreview}
											viewMode={1}
											minCropBoxHeight={10}
											minContainerWidth={10}
											background={false}
											autoCropArea={1}
											checkOrientation={false}
											onInitialized={(cropper) => setCropper(cropper)}
										/>
									</div>
									<p class="md:hidden font-medium text-lg">Preview</p>
									<div
										style={{
											aspectRatio: "127/80",
											display: "block",
											overflow: "hidden",
										}}
										className="md:mt-10 flex justify-center items-center max-w-sm col-span-1 img-preview"
									/>
								</div>

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={() => {
											getCropData();
										}}
									>
										Crop!
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default CropImageModal;
