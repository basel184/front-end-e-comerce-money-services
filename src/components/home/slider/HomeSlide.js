/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "@/src/Style/SlideInfo.scss";
import "@/src/Style/HomeSlide.css";
import "@/src/Style/products.css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "../../../utils/navigation";

function HomeSlide({ data, sl }) {
  return (
    <div className="home-slide">
      <div className="container">
        <div className="slider">
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {data?.map((el) => {
              return (
                <SwiperSlide key={`Slide_${el.id}`} className="slide-info">
                  <div className="row slide-x01 ">
                    <div className="col-lg-6 col-md-12 slide-x02 d-flex justify-content-lg-end justify-content-center maxw-lg-40">
                      <div className="text mx-5 ">
                        <h2 className="slider_head">{el?.title}</h2>
                        <div className="mobile_img">
                          <img src={el?.photo} alt="" />
                        </div>
                        <p className="slider_info">{el?.description}</p>
                        <Link href={`${el?.link}`} className="more-info">
                          {sl}
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 slide-x03 d-flex  justify-content-center maxw-lg-40">
                      <div className="image">
                        <img src={el?.photo} alt="" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default HomeSlide;
