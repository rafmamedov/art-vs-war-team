"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";

import "./styles.css";
import "swiper/css";

import "swiper/css/navigation";

import { useState } from "react";

const slides = [
  "/assets/images/Rectangle 2.png",
  "/assets/images/Rectangle 3.png",
  "/assets/images/Rectangle 4.png",
  "/assets/images/Rectangle 5.png",
  "/assets/images/Rectangle 6.png",
  "/assets/images/Rectangle 7.png",
  "/assets/images/Rectangle 2.png",
  "/assets/images/Rectangle 3.png",
  "/assets/images/Rectangle 4.png",
  "/assets/images/Rectangle 5.png",
  "/assets/images/Rectangle 6.png",
  "/assets/images/Rectangle 7.png",
];

const PaintingGallery = () => {
  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  return (
    <div className="App">
      <section className="slider">
        <div className="slider__flex">
          <div className="slider__col">
            {/* <div className="slider__prev">Prev</div> */}

            <div className="slider__thumbs">
              <Swiper
                onSwiper={setImagesNavSlider}
                direction="vertical"
                spaceBetween={24}
                slidesPerView={3}
                navigation={true}
                // navigation={{
                //   nextEl: ".slider__next",
                //   prevEl: ".slider__prev",
                // }}
                className="swiper-container1"
                breakpoints={{
                  0: {
                    direction: "horizontal",
                  },
                  768: {
                    direction: "vertical",
                  },
                }}
                modules={[Navigation, Thumbs]}
              >
                {slides.map((slide, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="slider__image">
                        <img src={slide} alt="" />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* <div className="slider__next">Next</div> */}
          </div>

          <div className="slider__images">
            <Swiper
              thumbs={{ swiper: imagesNavSlider }}
              direction="horizontal"
              slidesPerView={1}
              spaceBetween={32}
              mousewheel={true}
              navigation={true}
              // navigation={{
              //   nextEl: ".slider__next",
              //   prevEl: ".slider__prev",
              // }}
              breakpoints={{
                0: {
                  direction: "horizontal",
                },
                768: {
                  direction: "horizontal",
                },
              }}
              className="swiper-container2"
              modules={[Navigation, Thumbs, Mousewheel]}
            >
              {slides.map((slide, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <img src={slide} alt="" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaintingGallery;
