"use client";

import SwiperCard from "./SwiperCard";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/src/Style/swiperContainer.scss";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";

function SwiperCardsContainer() {
  const t = useTranslations();

  //https://moneyservices.store/back/public/api/completely-sold
  const [soldOut, setSoldOut] = useState();
  const locale = useLocale();
  const language = locale === "ar" ? "arabic" : "english";

  useEffect(() => {
    const soldOut = async () => {
      const response = await axios.get(
        `https://moneyservices.store/back/public/api/completely-sold?locale=${language}`
      );
      setSoldOut(response.data.products);
      //return response.data.products;
    };
    soldOut();
  }, [language]);

  return (
    <div className="container swiper-soldout-container">
      <h4 className="swiper_title"> {t("swiper_title")}</h4>
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
          {soldOut?.map((item) => (
            <SwiperSlide
              key={`Swip___Key_cards__${item.id}`}
              className="d-flex justify-content-center align-items-center"
            >
              <div>{<SwiperCard cardData={item} />}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperCardsContainer;
