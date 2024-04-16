"use client";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import "@/src/Style/singleProducts.css";
import { Link } from "@/src/utils/navigation";

export default function ProductsBuys({ cate }) {
  const t = useTranslations();
  const [cateId, setcateId] = useState(0);
  const [mainData, setMainData] = useState([]);
  const [filterdMainData, setFilterdMainData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userWishList, setUserWishList] = useState([]);
  const currUser =
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user"))) ||
    "";
  const language =
    typeof window !== "undefined" && window.localStorage.getItem("lng") === "ar"
      ? "arabic"
      : "english";

  async function getUserWishList() {
    if (currUser) {
      try {
        const res = await axios.get(
          `https://moneyservices.store/back/public/api/wishlist?user_id=${
            currUser?.user?.id || currUser?.id
          }`
        );
        setUserWishList(res.data.wishlist);
        fetchData();
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://moneyservices.store/back/public/api/home?locale=${language}`
      );
      const data = response.data;
      setMainData(data.featured_products.slice(0, 9));
      setFilterdMainData(data.featured_products);
      setLoader(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (currUser) {
      getUserWishList();
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className="buy-products py-4">
      <div className="container">
        <div className="head">
          <h4>{t("product_buy_head")}</h4>
        </div>
        <div
          className="product-cate d-flex justify-content-center p-2 rounded"
          style={{
            backgroundColor: "#ffb61e",
            width: "fit-content",
            margin: "auto",
          }}
        >
          <span
            className={`${cateId === 0 ? "active" : ""}`}
            onClick={() => {
              setFilterdMainData(mainData);
              localStorage.setItem("cate", "");
              setcateId(0);
            }}
          >
            {t("product_buy_all")}
          </span>
          {cate?.map((el) => (
            <span
              onClick={() => {
                localStorage.setItem("cate", JSON.stringify(el.slug));
                setcateId(el?.id);
                setFilterdMainData(
                  mainData.filter((item) => el.slug === item.cat_info.slug)
                );
              }}
              key={`Cat__Key__${el?.id}`}
              className={`${el?.id === cateId ? "active" : ""} text-capitalize`}
            >
              {el.title}
            </span>
          ))}
        </div>
        <div className="row mt-6 justify-content-center">
          {filterdMainData?.map((el) => {
            const isItemInWishList = userWishList.some(
              (item) => parseInt(item.product_id) === el.id
            );
            return (
              <ProductCard
                el={el}
                key={`PRod___Card___key${el.id}`}
                copone={el.copone}
                fav={isItemInWishList ? "Favorite" : "Not Set"}
              />
            );
          })}
        </div>
        <Link className="product-link" href={`/store`}>
          {t("product_buy_link")}
        </Link>
      </div>
    </div>
  );
}
