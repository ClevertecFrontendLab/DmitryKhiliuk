import {useState} from 'react';
import {Navigation, Thumbs} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {BookBlockType} from '../card/card';

import './slider.scss'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type SliderType = {
    book: BookBlockType
}

export const Slider = ({book}: SliderType) => {

    const [activeThumb, setActiveThumb] = useState<any>(null)


    return (
        <div>
            <Swiper
                data-test-id='slide-big'
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                thumbs={{swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null}}
                className='product-images-slider'
            >
                {
                    book!.image.map((item: any) => (
                        <SwiperSlide key={item}>
                            <img src={item} alt="product images" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setActiveThumb}
                loop={true}
                spaceBetween={35}
                slidesPerView={5}
                modules={[Navigation, Thumbs]}
                className='product-images-slider-thumbs'
            >
                {
                    book!.image.map((item: any) => (
                        <SwiperSlide key={item}>
                            <img src={item} alt="product images" data-test-id='slide-mini'/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    );
};


