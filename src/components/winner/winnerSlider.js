"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PrevDrawsCard from "./PrevDrawsCard";
import { Navigation, Pagination } from "swiper/modules";

function WinnerSlider({ prevDraws }) {
  return (
    <Swiper
      className="py-4 row d-flex justify-content-center"
      modules={[Pagination, Navigation]}
      loop={true}
      navigation={true}
      spaceBetween={1}
      slidesPerView={3}
      pagination={{ clickable: true }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        639: {
          slidesPerView: 1,
        },
        865: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },
        1440: {
          slidesPerView: 3,
        },
      }}
    >
      {prevDraws?.map((item) => (
        <SwiperSlide
          key={item.id}
          className="d-flex justify-content-center align-items-center"
        >
          <div>{<PrevDrawsCard cardData={item} />}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default WinnerSlider;
