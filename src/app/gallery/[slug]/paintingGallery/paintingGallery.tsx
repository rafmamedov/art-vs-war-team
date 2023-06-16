"use client";

import Image from "next/image";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Thumbs, Mousewheel, Pagination } from "swiper";

import "./styles.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import { useState } from "react";

const slides = [
  "/assets/images/Rectangle 2.png",
  "/assets/images/Rectangle 3.png",
  "/assets/images/Rectangle 4.png",
  "/assets/images/Rectangle 5.png",
  "/assets/images/Rectangle 6.png",
  "/assets/images/Rectangle 7.png",
];

const PaintingGallery = () => {
  const [imagesNavSlider, setImagesNavSlider] = useState<SwiperClass | null>(
    null
  );

  return (
    <div className="slider">
      <div className="slider__flex">
        <div className="slider__images">
          <Swiper
            thumbs={{
              swiper: imagesNavSlider,
              autoScrollOffset: 2,
            }}
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={32}
            mousewheel={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            className="swiper-container__image"
            modules={[Navigation, Thumbs, Mousewheel, Pagination]}
          >
            {slides.map((slide, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="slider__image">
                    <Image
                      src={slide}
                      alt={`image`}
                      width={800}
                      height={600}
                      style={
                        {
                          objectFit: "contain",
                        }
                      }
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="slider__col">
          <div className="slider__thumbs">
            <Swiper
              onSwiper={setImagesNavSlider}
              thumbs={{
                autoScrollOffset: 2,
              }}
              direction="vertical"
              spaceBetween={16}
              slidesPerView={4}
              loopedSlides={2}
              className="swiper-container__thumbs"
              breakpoints={{
                0: {
                  direction: "horizontal",
                },
                1024: {
                  direction: "vertical",
                },
              }}
              modules={[Navigation, Thumbs]}
            >
              {slides.map((slide, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <Image src={slide} alt={`image`} width={96} height={96} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingGallery;
