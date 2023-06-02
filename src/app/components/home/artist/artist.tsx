import React from 'react';
import styles from './artist.module.scss';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/swiper.css';

const Artist = () => {
  return (
    <section className={styles.artist}>
      <div className={styles.content}>
        <div className={styles.background}>
          <Swiper
            className={styles.swiper}
            modules={[Autoplay]}
            slidesPerView="auto"
            centeredSlides
            slidesOffsetBefore={-300}
            spaceBetween={16}
            speed={2000}
            autoplay={{
              delay: 5000,
              waitForTransition: true,
            }}
            loop
            loopedSlides={2}
          >
            <SwiperSlide className={styles.container}>
              <Image
                className={styles.image}
                src="/assets/images/Rectangle4.png"
                alt="background"
                fill
              />
            </SwiperSlide>

            <SwiperSlide className={styles.container}>
              <Image
                className={styles.image}
                src="/assets/images/Rectangle 5.png"
                alt="background"
                fill
              />
            </SwiperSlide>

            <SwiperSlide className={styles.container}>
              <Image
                className={styles.image}
                src="/assets/images/hero-layout-cards.png"
                alt="background"
                fill
              />
            </SwiperSlide>

            <SwiperSlide className={styles.container}>
              <Image
                className={styles.image}
                src="/assets/images/Rectangle 8.png"
                alt="background"
                fill
              />
            </SwiperSlide>

            <SwiperSlide className={styles.container}>
              <Image
                className={styles.image}
                src="/assets/images/Rectangle 7.png"
                alt="background"
                fill
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <h2 className={styles.title}>Are you an artist?</h2>
        <h6 className={styles.subtitle}>Become a part of our conscious community</h6>
        <div className={styles.button}>Create account</div>
      </div>
    </section>
  );
};

export default Artist;
