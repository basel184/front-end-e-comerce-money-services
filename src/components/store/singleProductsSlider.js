"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useDispatch } from "react-redux";
import { Line } from "rc-progress";
import { FaRegHeart, FaEye, FaHeart } from "react-icons/fa6";
import { setWishList, deleteItem } from "@/src/Redux/Reducers/wishList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/utils/navigation";

export default function SingleProductSlider({ products, copone }) {
  const t = useTranslations();
  const router = useRouter();

  const [userWishList, setUserWishList] = useState([]);
  const currUser =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user"))) ||
    "";
  async function getUserWishList() {
    console.log("*********THIS IS THE USER NOW********** ", currUser);
    console.log("inside getUserWishList ", currUser?.user?.id || currUser?.id);
    if (currUser) {
      try {
        const res = await axios.get(
          `https://moneyservices.store/back/public/api/wishlist?user_id=${
            currUser?.user?.id || currUser?.id
          }`,
          {}
        );
        console.log("INSIDE REQUEST***");
        console.log(res.data.wishlist);
        setUserWishList(res.data.wishlist);
      } catch (e) {
        console.log(e);
      }
    }
  }

  const [showAddFav, setShowAddFav] = useState(null);
  useEffect(() => {
    if (currUser) getUserWishList();
  }, [showAddFav]);

  console.log("WISHLIST", userWishList);

  const dispatch = useDispatch();

  function handleAddToFav(data) {
    console.log("dataaa", data);
    dispatch(setWishList(data))
      .then(() => {
        console.log("Successed");
        setShowAddFav((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error Adding to fav", error);
      });
  }
  console.log("AddFav", showAddFav);
  function handleRmFavourite(data) {
    dispatch(deleteItem(data?.id))
      .then(() => {
        console.log("Successed");
        setShowAddFav((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error deleting from fav", error);
      });
  }

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      loop
      pagination={{ clickable: true }}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
        320: {
          slidesPerView: 1,
        },
      }}
    >
      {products?.map((el) => {
        return (
          <div key={el.id}>
            <SwiperSlide>
              <div className="box ">
                <div className="product">
                  <div className="product_img">
                    <img src={el?.photo?.split(",")[0]} alt="" />
                    <div className="product_imgs">
                      {el.photo?.split(",")?.map((el, i) => {
                        return <img key={i} src={el} alt="" />;
                      })}
                    </div>
                  </div>
                  <div className="product_title">
                    <h4 className="product_name">
                      {localStorage.getItem("lng") === "ar"
                        ? el?.title_arabic
                        : el?.title_english}
                    </h4>
                    <p className="product_price">
                      {el?.price?.split(".")[0]}LE
                    </p>
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
                  <div className="add_to_watch_list">
                    {userWishList.some(
                      (item) => parseInt(item.product_id) === el?.id
                    ) ? (
                      <div onClick={() => handleRmFavourite(el)}>
                        <FaHeart />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          localStorage.getItem("user")
                            ? handleAddToFav(el)
                            : router.push(`/login`);
                        }}
                      >
                        <FaRegHeart />
                      </div>
                    )}
                  </div>
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
              </div>
            </SwiperSlide>
          </div>
        );
      })}
    </Swiper>
  );
}
