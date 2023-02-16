import {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {BookDetailType} from '../../common/types';

import './slider.scss';

import 'swiper/css';
import 'swiper/css/pagination';

type MobileSliderType = {
    book: BookDetailType
}

export const MobileSlider = ({book}:MobileSliderType) => (
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
    )
