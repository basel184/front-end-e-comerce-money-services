"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { singleProduct } from "@/src/Redux/Reducers/SingleProduct";

import "@/src/Style/singleProducts.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import {
  FaShoppingCart,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import SingleProductDesc from "./singleProductDesc";
import SingleProductReview from "./singleProductReview";

import SingleProductSlider from "./singleProductsSlider";

import { useCart } from "react-use-cart";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Line } from "rc-progress";
import { getCopons } from "@/src/Redux/Reducers/Products";
//import { setWishList } from "../Redux/Reducers/wishList";
import { ToastContainer, toast } from "react-toastify";
import {
  setIsError,
  setWishList,
  deleteItem,
} from "@/src/Redux/Reducers/wishList";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/utils/navigation";

export default function SingleProduct({ id }) {
  const locae = useLocale();
  const { data } = useSelector((state) => state.singleProduct);
  const [userWishList, setUserWishList] = useState([]);
  const router = useRouter();
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
  const t = useTranslations();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const language = locae === "ar" ? "arabic" : "english";

  let [state, setState] = useState(1);

  let [hide, setHide] = useState(false);
  const [img, setImg] = useState(null);
  const [colorBorder, setColorBorder] = useState(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(singleProduct(id));
    dispatch(getCopons());
  }, [dispatch, id]);
  // const { colors_hex } = useSelector((state) => state.colors);
  const [colors, setColors_hex] = useState(null);
  const { copones } = useSelector((state) => state.products);
  const { addItem } = useCart();
  const location = typeof window !== "undefined" && window.location;
  const pathname = usePathname();
  const changeImg = (img) => {
    console.log(img);
    setImg(img);
  };
  useEffect(() => {
    setColors_hex(null);
    fetch(`https://moneyservices.store/back/public/api/home?locale=${language}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data?.featured_products);
      });
  }, [language]);

  useEffect(() => {
    // قم بمسح الصورة هنا أو استدعاء الدالة التي تقوم بذلك
    changeImg(null);
    // يمكنك أيضًا إعادة تعيين الصورة إلى قيمة افتراضية إذا كانت هناك قيمة افتراضية
    // changeImg(defaultImgValue);

    // ضع هنا أي كود تريد تنفيذه عند دخول الصفحة
  }, [pathname]);

  useEffect(() => {
    if (data) {
      setColors_hex(data?.product_detail.color_id);
    }
  }, [size]);
  console.log({ colors });
  const [productData, setProductData] = useState();

  function handleAddToFav(data) {
    console.log("dataaa", data);
    dispatch(setWishList(data.product_detail))
      .then(() => {
        console.log("Successed");
        setShowAddFav((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error Adding to fav", error);
      });
  }
  const handleAddToCart = async () => {
    console.log({ size });
    console.log(color);

    if (data?.product_detail?.stock == 0) {
      toast.error("Product is sold out !");
    } else if (size && color == null) {
      toast.error(t("choose_size_color"));
    } else if (size == null) {
      toast.error(t("choose_size"));
    } else if (color == null) {
      toast.error(t("choose_color"));
    } else {
      try {
        console.log(color);
        const res = await axios.get(
          `https://moneyservices.store/back/public/api/check-product?product_id=${
            data?.product_detail?.id
          }&quantity=${state}&size=${size}&color=%23${
            color.startsWith("#") ? color.slice(1) : color
          }
          `
        );

        if (res && res.status === 200) {
          toast.success(
            res.data.message === "تم الاضافة للسلة"
              ? res.data.message
              : "Added to cart"
          );

          // قم بإضافة لون المنتج إلى الـ addItem
          addItem(
            {
              ...data?.product_detail,
              product_size: size,
              product_color: color, // إضافة لون المنتج هنا
              data,
            },
            state
          );
          // navicate("/cart")
        }
      } catch (err) {
        toast.error(err.response?.data?.message || t("unknown_error"));
      }
    }
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value); // Step 2: Handle size change
  };
  function handleRmFavourite(data) {
    dispatch(deleteItem(data?.product_detail?.id))
      .then(() => {
        console.log("Successed");
        setShowAddFav(true);
      })
      .catch((error) => {
        console.error("Error deleting from fav", error);
      });
  }

  const isItemInWishList = userWishList.some(
    (item) => parseInt(item.product_id) === data?.product_detail?.id
  );

  console.log("isItemInWishList", isItemInWishList);
  return (
    <>
      <div className="single_product">
        <div
          className="container single_prod_cont"
          style={{
            margin: "40px 0",
          }}
        >
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-12">
              <div className="product_image">
                <div className="row">
                  <div className="col-md-12" style={{ textAlign: "center" }}>
                    <img
                      className="slider_img"
                      src={img === null ? data?.product_detail?.photo[0] : img}
                      alt={data?.product_detail?.title}
                    />
                  </div>
                  <div className="col-md-12">
                    <Swiper
                      style={{ width: "392px" }}
                      modules={[Pagination]}
                      spaceBetween={50}
                      loop
                      pagination={{ clickable: true }}
                      breakpoints={{
                        768: {
                          slidesPerView: 3,
                        },
                        320: {
                          slidesPerView: 3,
                        },
                      }}
                    >
                      {data?.product_detail?.photo?.map((el, index) => (
                        <SwiperSlide key={index}>
                          <div className="box">
                            <div className="product">
                              <div
                                className="product_img"
                                style={{ height: "100px" }}
                              >
                                <img
                                  style={{ width: "100px", height: "100px" }}
                                  onClick={() => changeImg(el)}
                                  src={el}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 col-11">
              <div className="product_info" style={{ margin: "0 17px" }}>
                <h1
                  className="product_title"
                  style={{
                    boxSizing: "border-box",
                    marginBottom: "8px",
                  }}
                >
                  {data?.product_detail?.title}
                </h1>
                <div className="product_review">
                  <h4 className="product_review_head">
                    {t("single_product_taps_reviews")} (
                    {data?.product_detail?.get_review?.length})
                  </h4>
                </div>
                <div className="product_content">
                  <p
                    className="product_price"
                    style={{ color: "#ffb61e", "font-size": "25px" }}
                  >
                    {data?.product_detail?.price?.split(".")[0]}LE
                  </p>
                  <div className="product_limit">
                    <span>
                      {t("product_quantity_title")}{" "}
                      {data?.product_detail?.stock}
                    </span>
                    <Line
                      percent={
                        (data?.product_detail?.stock /
                          data?.product_detail?.total_stock) *
                        100
                      }
                      strokeWidth={3}
                      trailWidth={4}
                      strokeColor={"#ffb61e"}
                      className="p-2"
                    />
                  </div>
                  <ul>
                    <li className="product_status">
                      <h6 className="head">{t("single_product_status")}:</h6>
                      {data?.product_detail?.stock === "0"
                        ? t("single_product_status_value_two")
                        : t("single_product_status_value_one")}
                    </li>
                    <li className="product_cat">
                      <h6 className="head">{t("single_product_cat")}:</h6>
                      {language === "arabic"
                        ? data?.product_detail?.cat_info?.title_arabic
                        : data?.product_detail?.cat_info?.title_english}
                    </li>
                  </ul>
                  <hr />
                  <ul>
                    <li className="select_size">
                      <h6 className="head">
                        {t("single_product_select_size")}:
                      </h6>
                      <select
                        name=""
                        id=""
                        className="form-select"
                        onChange={(e) => setSize(e.target.value)}
                        value={size || ""}
                      >
                        <option value="" disabled>
                          {t("select_size_placeholder")}
                        </option>
                        {data?.product_detail?.size?.map((el) => (
                          <option value={el} key={Math.random() * 4}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </li>
                    {data?.product_detail?.color_id !== null && (
                      <li className="color_list">
                        <h6 className="head">
                          {t("sngle_prodict_color_head")}:
                        </h6>
                        {colors &&
                          colors.map((el, i) => {
                            return (
                              <div
                                className="color_item"
                                onClick={() => {
                                  setColor(el);
                                  setColorBorder(i);
                                }}
                                key={i}
                                style={{
                                  backgroundColor: el,
                                  border:
                                    colorBorder === i ? "2px solid orange" : "",
                                }}
                              ></div>
                            );
                          })}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="product_operation">
                  <div className="length">
                    <button
                      className="length_increment"
                      onClick={() => {
                        setState((state = state + 1));
                        state < 0 && setState(1);
                      }}
                    >
                      +
                    </button>
                    <span className="length_value">{state}</span>
                    <button
                      className="length_decrement"
                      onClick={() => {
                        setState((state = state - 1));
                        state < 1 && setState(1);
                      }}
                    >
                      -
                    </button>
                  </div>
                  <div className="operation_content">
                    {!isItemInWishList ? (
                      <button
                        onClick={() => {
                          localStorage.getItem("user")
                            ? handleAddToFav(data)
                            : router.push(`/login`);
                        }}
                        className="add_to_cart"
                      >
                        <h6>{t("add_to_favorite")}</h6>
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRmFavourite(data)}
                        className="add_to_cart"
                      >
                        <h6>{t("rm_from_favorite")}</h6>
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    )}
                    {data?.product_detail?.stock != 0 ? (
                      <button onClick={handleAddToCart} className="add_to_cart">
                        <h6>{t("add_to_cart")}</h6>
                        <FaShoppingCart />
                      </button>
                    ) : (
                      <button
                        style={{
                          background: "rgb(255 0 0 / 38%)",
                          color: "#000000",
                        }}
                        className="add_to_cart"
                      >
                        <h6>{t("Sold_out_completely")}</h6>
                        <i class="fa fa-ban" aria-hidden="true"></i>
                      </button>
                    )}
                    {/*<div className="add_to_watchlist"
                onClick={() => {
                    dispatch(setWishList(data?.product_detail?.slug))
                }}
                >
                  <FaHeart />
              </div>*/}
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>

          {/* <div className="slider">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={0}
              pagination={{ clickable: true }}
              loop={true}
            >
              {data?.product_detail?.rel_prods?.map((el) => {
                return (
                  <SwiperSlide key={el?.id}>
                    <div className="img border-bottom">
                      <img src={el?.photo} alt="" />
                    </div>
                    <div className="info text-center mt-2">
                      <h6>
                        {localStorage.getItem("lng") === "arabic"
                          ? el?.title_arabic
                          : el?.title_english}
                      </h6>
                      <p className="price fs-4" style={{ color: "#ffb61e" }}>
                        {el?.price?.split(".")[0]}LsssE
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div> */}
        </div>
        <div className="content" style={{ marginTop: "5.5pc" }}>
          <div className="container">
            <div className="product_share">
              <FacebookShareButton
                url={`${location.href}`}
                quote={"hey let's go"}
                hashtag={data?.product_detail?.cat_info?.title}
                className="facebook_share"
              >
                {t("single_product_facebook_share")}
                <FaFacebookF />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${location.href}`}
                quote={"hey let's go"}
                hashtag={data?.product_detail?.cat_info?.title}
                className="twitter_share"
              >
                {t("single_product_twitter_share")}
                <FaTwitter />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`${location.href}`}
                quote={"hey let's go"}
                hashtag={data?.product_detail?.cat_info?.title}
                className="whatsapp_share"
              >
                {t("single_product_whats_share")}
                <FaWhatsapp />
              </WhatsappShareButton>
            </div>
            <div className="product_taps">
              <div className="product_taps_head">
                <div
                  className={`taps_products ${hide === false && "active"}`}
                  onClick={() => setHide(false)}
                >
                  <h6>{t("single_product_taps_information")}</h6>
                </div>
                <div
                  className={`taps_reviews ${hide === true && "active"}`}
                  onClick={() => setHide(true)}
                >
                  <h6>
                    {t("single_product_taps_reviews")} (
                    {data?.product_detail?.get_review?.length})
                  </h6>
                </div>
              </div>
              <div className="product_tap_content">
                {hide === false ? (
                  <SingleProductDesc desc={data?.product_detail?.description} />
                ) : (
                  <SingleProductReview
                    reviews={data.product_detail?.get_review}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="similar_products">
          <div className="container">
            <div className="similar_product_head">
              <h2 className="text-center">
                {t("single_product_similar_products_head")}
              </h2>
            </div>
            <SingleProductSlider
              products={data?.product_detail?.rel_prods}
              copone={copones}
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
