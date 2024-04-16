/* eslint-disable @next/next/no-img-element */
"use client";
/* eslint-disable no-unused-vars */
import { FaEye } from "react-icons/fa";
import { Line } from "rc-progress";
import "@/src/Style/storeCard_newDesign.scss";
import { useTranslations } from "next-intl";
import { Link } from "@/src/utils/navigation";

/* eslint-disable react/prop-types */
export default function ProductStoreCard({ el, layout, copone }) {
  const t = useTranslations();

  return (
    <div
      className={`${
        layout === true ? "col-lg-4 col-md-6 col-sm-12" : "d-flex"
      }`}
      style={{ width: layout === true ? "" : "80%" }}
    >
      <div className={`store_product mt-4 ${layout === true ? "" : "d-flex"}`}>
        {layout === true ? (
          <>
            <Link
              className="product_preview"
              href={`/store/product/${el.slug}`}
            >
              <div className="img">
                <img src={el?.photo.split(",")[0]} alt="test" />
                <div className="operation">
                  <FaEye />
                </div>
              </div>
            </Link>
            <div className="product_info">
              <h4 className="product_head">{el?.title}</h4>
              <p className="product_price">
                <span>{el?.price.split(".")[0]}</span>
                LE
              </p>
              <div className="product_quantity">
                {t("product_quantity_title")}: {el?.total_stock}
                <Line
                  percent={el?.stock}
                  strokeWidth={3}
                  trailWidth={4}
                  strokeColor={"#ffb61e"}
                  className="p-2"
                />
              </div>
            </div>
            <div className="product_copone">
              <p>{el?.copon}</p>
            </div>
          </>
        ) : (
          <div className="Card-container">
            <div className="img-container">
              <img src={el?.photo.split(",")[0]} alt="" />
              {/* <Progress value={el?.stock} /> */}
            </div>
            <div className="info">
              <h5>{el.title}</h5>

              <p className="product_price">{el?.price.split(".")[0]}$</p>
              <div className="product_quantity">
                {t("product_quantity_title")} {el?.stock}
              </div>
              <Line
                percent={(el?.stock / el?.total_stock) * 100}
                strokeWidth={3}
                trailWidth={4}
                strokeColor={"#ffb61e"}
                className="p-2 w-50"
              />
              <p
                className="product_desc"
                dangerouslySetInnerHTML={{
                  __html: el?.description?.slice(0, 100),
                }}
              ></p>
              <div className="operation_content">
                <Link
                  href={`/store/product/${el.slug}`}
                  className="add_to_cart grid-btn"
                >
                  <h6>{t("order_of_showDetails")}</h6>
                  {/*                   <FaShoppingCart />
                   */}{" "}
                </Link>
                {/*<div className="add_to_watchlist">
                  <FaHeart />
                 </div>*/}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
