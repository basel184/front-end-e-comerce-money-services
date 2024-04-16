"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function DetailsSwiper({ winners }) {
  return (
    <Swiper
      className="py-4 row d-flex justify-content-center h-100 swiper-bottom"
      modules={[Pagination, Navigation]}
      loop={true}
      navigation={true}
      spaceBetween={1}
      slidesPerView={1}
      pagination={{ clickable: true }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        639: {
          slidesPerView: 1,
        },
        865: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
        1280: {
          slidesPerView: 1,
        },
        1440: {
          slidesPerView: 1,
        },
      }}
    >
      {winners.map((item) => (
        <SwiperSlide
          key={item.id}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="slide">
            <img src={item?.photo} alt="" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default DetailsSwiper;
