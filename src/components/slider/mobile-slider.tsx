import {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {BookBlockType} from '../card/card';

import './slider.scss';

import 'swiper/css';
import 'swiper/css/pagination';

type MobileSliderType = {
    book: BookBlockType
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
                    book!.image.map((item: any) => (
                        <SwiperSlide key={item} data-test-id='slide-mini'>
                            <img src={item} alt="product images"/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}
