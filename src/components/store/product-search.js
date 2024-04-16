/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */
import "@/src/Style/Store.scss";
import "@/src/Style/products.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
// import Summry from "../Components/summry";
import { FaList, FaSquare } from "react-icons/fa";
import { getCopons } from "@/src/Redux/Reducers/Products";
import ProductStoreCard from "./ProductStoreCard";
import Paginate from "./Pagination";
import { useTranslations } from "next-intl";

export default function SearchProducts() {
  const [layout, setLayout] = useState(true);
  const t = useTranslations();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getCopons());
  }, []);
  const { data } = useSelector((state) => state.search);
  const { copones } = useSelector((state) => state.products);

  return (
    <div className="search_product">
      <div className="container my-5 store">
        <div className="row d-flex justify-content-between">
          <div className="col-md-3   "></div>
          <div className="col-md-8 ">
            <div className="store_head">
              <div className="products_length">
                {data?.search?.data
                  ? data?.search?.data?.length + " " + t("store_product_length")
                  : data?.search?.data?.length +
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
              <div className={`${layout === true ? "row" : "content"}`}>
                {data?.search?.data.length != 0 ? (
                  data?.search?.data?.map((el) => {
                    return (
                      <ProductStoreCard
                        el={el}
                        layout={layout}
                        key={el.id}
                        copone={copones}
                      />
                    );
                  })
                ) : (
                  <div>
                    <img
                      src={"/assets/images/no-results.png"}
                      alt=""
                      className="w-50"
                    />
                    <h2>{t("no_product")}</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Paginate info={data?.search} />
      </div>
    </div>
  );
}
