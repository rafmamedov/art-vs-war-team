"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Thumbs, Mousewheel, Pagination } from "swiper";

import "./styles.scss";
import "@styles/globals.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

type Props = {
  paintings: string[];
  title: string;
  author: string;
};

const PaintingGallery: React.FC<Props> = ({ paintings, title, author }) => {
  const [openPhotoSwipe, setOpenPhotoSwipe] = useState(false);
  const [imagesNav, setImagesNav] = useState<SwiperClass | null>(null);

  const handleImage = () => {
    setOpenPhotoSwipe(!openPhotoSwipe);
  };

  return (
    <>
      <div className="slider">
        <div className="slider__flex">
          <div className="slider__images">
            <Swiper
              thumbs={{
                swiper: imagesNav && !imagesNav.destroyed ? imagesNav : null,
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
              {paintings.map((slide: string, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <Image
                        src={slide}
                        alt={`art ${title} by ${author}`}
                        width={800}
                        height={600}
                        style={{
                          objectFit: "contain",
                        }}
                        className="imageOpacityEffect"
                        onLoadingComplete={(img) => (img.style.opacity = "1")}
                        onClick={handleImage}
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
                onSwiper={setImagesNav}
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
                {paintings.map((slide: string, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="slider__image">
                        <Image
                          src={slide}
                          alt={`art ${title} by ${author}`}
                          width={96}
                          height={96}
                          className="imageOpacityEffect"
                          onLoadingComplete={(img) => (img.style.opacity = "1")}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaintingGallery;
