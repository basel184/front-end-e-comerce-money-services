"use client";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/src/Style/swiperWinners.scss";
import SwiperWinnerCard from "./SwiperWinnerCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";

function SwiperWinners() {
  const t = useTranslations();
  const locale = useLocale();
  const language = locale === "ar" ? "arabic" : "english";

  const [winners, setwinners] = useState();

  useEffect(() => {
    const soldOut = async () => {
      const response = await axios.get(
        `https://moneyservices.store/back/public/api/winrer-user?locale=${language}`
      );
      setwinners(response.data.Winrers);
      //return response.data.products;
    };
    soldOut();
  }, [language]);

  return (
    <div
      className="container swiper-container"
      style={{ backgroundColor: "#F6F7F8" }}
    >
      <h4 className="swiper_win_title"> {t("swiper_win_title")}</h4>
      <div className="py-4">
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
          {winners && winners.length > 0 ? (
            winners.map((item) => (
              <SwiperSlide
                key={`Winner__Key__${item.id}`}
                className="d-flex justify-content-center align-items-center"
              >
                <div>{<SwiperWinnerCard cardData={item} />}</div>
              </SwiperSlide>
            ))
          ) : (
            <div
              className="item mx-auto"
              style={{ textAlign: "center", fontSize: "xx-large" }}
            >
              <p className="fw-bold m-3">{t("soon")}</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperWinners;
