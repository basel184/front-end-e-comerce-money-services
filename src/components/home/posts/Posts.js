/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useLayoutEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "@/src/Style/Posts.css";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Link } from "@/src/utils/navigation";

export default function Posts() {
  const t = useTranslations();
  const [data, setBlog] = useState([]);
  const language =
    typeof window !== "undefined" && window.localStorage.getItem("lng") === "ar"
      ? "arabic"
      : "english";

  useLayoutEffect(() => {
    axios
      .get(
        `https://moneyservices.store/back/public/api/home?locale=${language}`
      )
      .then((res) => {
        setBlog(res.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, [language]);
  //const { data } = useSelector((state) => state.home);
  return (
    <div className="posts">
      <div className="container">
        <h4 className="post_head">{t("post_head")}</h4>
        <Swiper
          modules={[Pagination]}
          loop={true}
          spaceBetween={40}
          slidesPerView={2}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            639: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {data?.posts?.map((el) => {
            return (
              <>
                <div
                  className="swiper-button-next"
                  key={`Post_EL_KKKey${el?.id}`}
                ></div>
                <SwiperSlide className="content d-flex mt-2">
                  <Link href={`/blog/post/${el.slug}`}>
                    <div className="post">
                      <div className="img">
                        <img src={`${el?.photo}`} alt={el?.title} />
                      </div>
                      <div className="info">
                        <Link href={`/blog/post/${el?.slug}`}>{el?.title}</Link>
                        <p
                          style={{ color: "#979595" }}
                          dangerouslySetInnerHTML={{
                            __html: el?.description?.slice(0, 60),
                          }}
                        ></p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
                <div className="swiper-button-prev"></div>
              </>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
