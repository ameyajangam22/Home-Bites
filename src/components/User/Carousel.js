import SwiperCore, {
	Navigation,
	Autoplay,
	Pagination,
	Scrollbar,
	A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { Link, useHistory } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
const Carousel = () => {
	return (
		<>
			<div className="bg-gray-800 m-auto text-white text-5xl justify-center h-48 md:h-xl md:text-8xl flex">
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					autoplay={{ delay: 3000 }}
					pagination={{ clickable: true }}
					scrollbar={{ draggable: true }}
					onSwiper={(swiper) => console.log(swiper)}
					onSlideChange={() => console.log("slide change")}
				>
					<SwiperSlide className="flex cursor-pointer justify-center items-center">
						<img
							className=""
							src="https://res.cloudinary.com/home-bites/image/upload/v1628575575/slide1-01_hi0dpp.jpg"
							alt="slide-1"
						/>
					</SwiperSlide>
					<SwiperSlide className="flex cursor-pointer justify-center items-center">
						<img
							src="https://res.cloudinary.com/home-bites/image/upload/v1628575575/slide2-01_wb9uwe.jpg"
							alt="Slide-2"
						/>
					</SwiperSlide>
					<SwiperSlide className="flex cursor-pointer justify-center items-center">
						<img
							src="https://res.cloudinary.com/home-bites/image/upload/v1628576571/slide-3-01_ryvkql.jpg"
							alt="Slide-3"
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</>
	);
};

export default Carousel;
