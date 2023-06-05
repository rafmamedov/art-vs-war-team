import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper.css';

import styles from './carousel.module.scss';

const images = [
  'Rectangle 3.png',
  'Rectangle 4.png',
  'Rectangle 5.png',
  'Rectangle 6.png',
  'Rectangle 7.png',
];

const Carousel = () => (
    <Swiper
      className={styles.swiper}
      modules={[Autoplay]}
      slidesPerView="auto"
      slidesOffsetBefore={-300}
      spaceBetween={16}
      centeredSlides
      loop
      speed={2000}
      loopedSlides={2}
      autoplay={{
        delay: 5000,
        waitForTransition: true,
      }}
    >
        {images.map(image => (
          <SwiperSlide
            key={image}
            className={styles.container}
          >
            <Image
              className={styles.image}
              src={`/assets/images/${image}`}
              alt="background"
              fill
            />
          </SwiperSlide>
        ))}
    </Swiper>
);

export default Carousel;
