/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import "@/src/Style/Store.scss";
import "@/src/Style/products.css";
import "@/src/Style/singleProducts.css";
import "@/src/Style/inputRangeduble.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Filter, getCopons, getProducts } from "@/src/Redux/Reducers/Products";
import { useDispatch } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";

import { FaList, FaSquare } from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCategories } from "@/src/Redux/Reducers/categories";
import ReactSlider from "react-slider";
import axios from "axios";
import ProductStoreCard from "@/src/components/store/ProductStoreCard";
import Paginate from "@/src/components/store/Pagination";
import HomeSearch from "@/src/components/home/HomeSearch";
import StoreProductCard from "@/src/components/store/StoreProductCard";
import { useLocale, useTranslations } from "next-intl";

const DelayedRender = ({ delay, children }) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRendered(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return isRendered ? children : null;
};

export default function Store() {
  const [layout, setLayout] = useState(true);
  const t = useTranslations();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getProducts());
    dispatch(getCopons());
  }, []);

  const [userWishList, setUserWishList] = useState([]);
  const currUser =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user"))) ||
    "";

  async function getUserWishList() {
    if (currUser) {
      try {
        const res = await axios.get(
          `https://moneyservices.store/back/public/api/wishlist?user_id=${
            currUser?.user?.id || currUser?.id
          }`,
          {}
        );
        setUserWishList(res.data.wishlist);
      } catch (e) {
        console.error("Error fetching wishlist:", e);
      }
    }
  }

  useEffect(() => {
    if (currUser) getUserWishList();
  }, []);

  const [mainData, setMainData] = useState([]);
  const [filterdmainData, setFilterdmainData] = useState([]);
  const [theData, setTheData] = useState();
  const locale = useLocale();
  const language = locale === "ar" ? "arabic" : "english";

  useEffect(() => {
    axios
      .get(
        `https://moneyservices.store/back/public/api/home?locale=${language}`
      )
      .then((response) => {
        setTheData(response.data);
        setMainData(response.data.featured_products);
        setFilterdmainData(response.data.featured_products);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, [language]);

  const [cate, setCate] = useState("");
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [brand, setBrand] = useState([]);
  const [active, setActive] = useState(1);
  const [color, setColor] = useState([]);
  const [winners, setWinners] = useState([]);
  const [colorActive, setColorActive] = useState("");
  useLayoutEffect(() => {
    dispatch(getCategories());
    axios
      .get(
        `https://moneyservices.store/back/public/api/brands?locale=${language}`
      )
      .then((res) => {
        setBrand(res.data?.brand);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });

    axios
      .get("https://moneyservices.store/back/public/api/colors")
      .then((el) => {
        setColor(el.data.color);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  }, [language]);
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(
          `https://moneyservices.store/back/public/api/home?locale=${language}` // Replace with your API endpoint
        );

        // Assuming the response data is an array of winners
        console.log("Error fetching winners:", response.data);
        setWinners(response.data.slider_draws);
      } catch (error) {
        console.error("Error fetching winners:", error);
        // Handle error if needed
      }
    };

    // Call the function to fetch winners when the component mounts
    fetchWinners();
  }, [language]);

  //   useEffect(() => {
  //     fetch(`https://moneyservices.store/back/public/api/home?locale=${language}`)
  //       .then((response) => response.json())
  //       .then((data) => setbanData(data));
  //   }, [language]);

  const [catData, setCatData] = useState();
  const [productData, setProductData] = useState();

  useEffect(() => {
    axios
      .get(
        `https://moneyservices.store/back/public/api/home?locale=${language}`
      )
      .then((response) => {
        setCatData(response.data?.categories);
        setProductData(response.data?.featured_products);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, [language]);

  const renderDelayedProducts = () => {
    return filterdmainData?.map((el, index) => {
      const isItemInWishList = userWishList.some(
        (item) => parseInt(item.product_id) === el.id
      );

      const delay = index * 500;

      return (
        <DelayedRender key={el.id} delay={delay}>
          {layout ? (
            <StoreProductCard
              el={el}
              key={el.id}
              copone={el.copone}
              fav={isItemInWishList ? "Favorite" : "Not Set"}
            />
          ) : (
            <ProductStoreCard el={el} layout={layout} key={el.id} />
          )}
        </DelayedRender>
      );
    });
  };
  return (
    <>
      <div className="container my-5 store">
        <div className="store_slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="p-3"
          >
            {winners.map((el) => (
              <SwiperSlide key={el.id}>
                <div className="container">
                  <div className="row" key={el.id}>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="box mt-4">
                        <h4 className="fs-3 slider_head">
                          {t("custom_slider_head")}
                        </h4>
                        <p className="fs-3 slider_info">
                          {t("products_to_win")}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="box img mt-4">
                        <img src={el.photo} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="row d-flex justify-content-between">
          <h1
            className="text-center post_head"
            style={{ "font-weight": "700" }}
          >
            {t("header_link_shop")}
          </h1>
          <div className="col-md-3">
            <div className="summry">
              <div className="bg-light p-1">
                <h4>{t("store_summry_cate")}</h4>
                <ul>
                  <li
                    className={`category_title `}
                    key={324}
                    onClick={() => {
                      setFilterdmainData(mainData);
                    }}
                  >
                    {t("product_buy_all")}
                  </li>
                  {catData?.map((el) => (
                    <li
                      className={`category_title `}
                      style={{ color: cate === el.id ? "#ffb61e" : "" }}
                      key={el.id}
                      onClick={() => {
                        localStorage.setItem("cate", JSON.stringify(el.slug));
                        setCate(el.id);
                        setFilterdmainData(
                          mainData.filter((item) => {
                            if (el.slug === item.cat_info.slug) {
                              return item;
                            }
                          })
                        );
                      }}
                    >
                      {el.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-light my-4 p-3">
                <label htmlFor="customRange1" className="form-label ">
                  <h5 className="fw-bolder ">{t("store_summry_price_head")}</h5>
                  <div className="d-flex">
                    <div className="price_info">
                      <h6>{language === "ar" ? "الحدود : " : "Range : "}</h6>
                      <h6>
                        {price1} - {price2} L.E
                      </h6>
                    </div>
                  </div>
                </label>

                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  defaultValue={[20, 10000]}
                  min={20}
                  max={10000}
                  ariaLabel={["Lower thumb", "Upper thumb"]}
                  ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                  renderThumb={(props, state) => (
                    <div {...props}>{state.valueNow}</div>
                  )}
                  pearling
                  onAfterChange={(value) => {
                    dispatch(Filter());
                    localStorage.setItem("price", JSON.stringify(value));
                    setPrice1(value[0]);
                    setPrice2(value[1]);
                    setFilterdmainData(
                      mainData.filter((item) => {
                        return (
                          +item.price >= value[0] && +item.price <= value[1]
                        );
                      })
                    );
                  }}
                  minDistance={10}
                />
              </div>

              <div className="bg-light p-3 color">
                <ul>
                  {color?.map((el) => (
                    <li
                      className={`${colorActive === el?.id && "active"}`}
                      key={el.id}
                      style={{ backgroundColor: el?.color_hex }}
                      data-color={el?.color_hex}
                      onClick={() => {
                        localStorage.setItem(
                          "color",
                          JSON.stringify(el?.color_hex)
                        );
                        setColorActive(el?.id);
                        setFilterdmainData(
                          mainData.filter((element) => {
                            if (element.color_id !== null) {
                              return element.color_id[0] === el?.color_hex;
                            }
                          })
                        );
                      }}
                    ></li>
                  ))}
                </ul>
              </div>
              <div className="bg-light p-3">
                <h4>{t("store_summry_brand")}</h4>
                <ul>
                  {brand?.map((el) => (
                    <li
                      className={`brand_title `}
                      style={{ color: active === el?.id ? "#ffb61e" : "" }}
                      onClick={() => {
                        setFilterdmainData(
                          mainData.filter((brandItem) => {
                            return brandItem.brand_id === el?.id;
                          })
                        );
                        setActive(el?.id);
                        localStorage.setItem("brand", JSON.stringify(el?.slug));
                        dispatch(Filter());
                      }}
                      key={el?.id}
                    >
                      {el?.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="store_head">
              <div className="products_length">
                {filterdmainData
                  ? filterdmainData?.length + " " + t("store_product_length")
                  : filterdmainData?.products?.theData?.length +
                    " " +
                    t("store_product_length")}
              </div>
              <div className="product_operation">
                <button onClick={() => setLayout(false)}>
                  <FaList />
                </button>
                <button onClick={() => setLayout(true)}>
                  <FaSquare />
                </button>
              </div>
            </div>

            <div className="container">
              <div
                className={`${
                  layout === true
                    ? "row mt-6 justify-content-center align-items-center"
                    : "flex"
                }`}
              >
                {renderDelayedProducts()}
              </div>
            </div>
          </div>
        </div>
        <HomeSearch />
        <Paginate />
      </div>
    </>
  );
}
