import {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {BookBlockType} from '../card/card';

import './slider.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import {BookDetailType} from "../../common/types";

type MobileSliderType = {
    book: BookDetailType
}

export const MobileSlider = ({book}:MobileSliderType) => {
    const x = () => {

    }


    return (
        <div>
            <Swiper
                data-test-id='slide-big'
                spaceBetween={1}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    book.images.map((item) => (
                        <SwiperSlide key={item.url} data-test-id='slide-mini'>
                            <img src={(`https://strapi.cleverland.by${item.url}`)} alt="product images"/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}
