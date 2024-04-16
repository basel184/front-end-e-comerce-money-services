/* eslint-disable @next/next/no-img-element */
"use client";
import { useDispatch } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { HomeApi } from "@/src/Redux/Reducers/Home";
import { Line } from "rc-progress";
import { getCopons } from "@/src/Redux/Reducers/Products";
import { FaEye } from "react-icons/fa6";
import StarsRating from "react-star-rate";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/utils/navigation";

export default function LatestProducts() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(HomeApi());
    dispatch(getCopons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const t = useTranslations();
  const router = useRouter();

  const [newProducts, setNewProducts] = useState();
  const language =
    typeof window !== "undefined" && window.localStorage.getItem("lng") === "ar"
      ? "arabic"
      : "english";
  useEffect(() => {
    fetch(`https://moneyservices.store/back/public/api/home?locale=${language}`)
      .then((response) => response.json())
      .then((data) => {
        setNewProducts(data?.new_products);
      });
  }, [language]);

  return (
    <div className="latest-product">
      <div className="img_bg"></div>
      <div className="container">
        <h4 className="product_head">{t("latest_products_head")}</h4>
        <Swiper
          modules={[Pagination, Navigation]}
          loop={true}
          navigation={true}
          spaceBetween={10}
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
          {newProducts?.map((el) => {
            return (
              <SwiperSlide className="content px-6" key={`Last_${el.id}_Slide`}>
                <div className="product">
                  <div className="product_img">
                    <img src={el?.photo?.split(",")[0]} alt="" />
                    <div className="product_imgs">
                      {el.photo?.split(",")?.map((el, i) => {
                        return (
                          <img key={`Product_${i}_Image`} src={el} alt="" />
                        );
                      })}
                    </div>
                  </div>
                  <div className="product_title">
                    <h4 className="product_name">{el?.title}</h4>
                    <p className="product_price">
                      {el?.price?.split(".")[0]}LE
                    </p>
                  </div>
                  <div className="stars-rating text-center">
                    <StarsRating
                      value={el?.get_review[0]?.rate}
                      style={{ fontSize: "20px" }}
                    />
                  </div>
                  <div className="product_quantity">
                    {t("product_quantity_title")}: {el?.stock}
                    <Line
                      percent={el?.stock}
                      strokeWidth={3}
                      trailWidth={4}
                      strokeColor={"#ffb61e"}
                      className="p-2"
                    />
                  </div>
                  {/*<div className="add_to_watch_list">
                    <FaRegHeart />
                    </div>*/}
                  <div
                    className="watch_details text-center"
                    onClick={() => {
                      router.push(`/store/product/${el.slug}`);
                    }}
                  >
                    {t("latest_products_link")}
                    <FaEye />
                  </div>
                  <div className="product_copone">
                    <p>{el?.copon}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          {newProducts?.map((el) => {
            return (
              <SwiperSlide className="content px-6" key={el.id}>
                <div className="product">
                  <div className="product_img">
                    <img src={el?.photo?.split(",")[0]} alt="" />
                    <div className="product_imgs">
                      {el.photo?.split(",")?.map((el, i) => {
                        return (
                          <img key={`Slide_Product_${i}`} src={el} alt="" />
                        );
                      })}
                    </div>
                  </div>
                  <div className="product_title">
                    <h4 className="product_name">{el?.title}</h4>
                    <p className="product_price">
                      {el?.price?.split(".")[0]}LE
                    </p>
                  </div>
                  <div className="stars-rating">
                    <StarsRating value={el?.get_review[0]?.rate} />
                  </div>
                  <div className="product_quantity">
                    {t("product_quantity_title")}: {el?.stock}
                    <Line
                      percent={el?.stock}
                      strokeWidth={3}
                      trailWidth={4}
                      strokeColor={"#ffb61e"}
                      className="p-2"
                    />
                  </div>
                  {/*<div className="add_to_watch_list">
                    <FaRegHeart />
                    </div>*/}
                  <div
                    className="watch_details text-center"
                    onClick={() => {
                      router.push(`/store/product/${el.slug}`);
                    }}
                  >
                    {t("latest_products_link")}
                    <FaEye />
                  </div>
                  <div className="product_copone">
                    <p>{el?.copon}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
