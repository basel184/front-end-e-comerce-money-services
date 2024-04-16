"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/src/Style/copones.css";
import { useTranslations } from "next-intl";
import SideBarUser from "./user/SideBarUser";
import useIsAuthUser from "../hooks/useIsAuth";

export default function Copouns() {
  const isAuth = useIsAuthUser();
  const t = useTranslations();
  const [active, setActive] = useState({});
  const [copons, setCopons] = useState({}); // Add this line
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  async function activeCopouns() {
    try {
      let response = await axios.get(
        `https://moneyservices.store/back/public/api/copons?user_id=${
          user?.user?.id ? user?.user?.id : user?.id
        }&status=active`
      );
      let copones = response.data.copons;
      setActive(copones);
    } catch (error) {
      console.error("Error fetching active copouns:", error);
      setError(
        error.message || "An error occurred while fetching active copouns"
      );
    }
  }

  useEffect(() => {
    activeCopouns();
  }, []);

  async function getCancelCopouns() {
    try {
      let response = await axios.get(
        `https://moneyservices.store/back/public/api/copons?user_id=${
          user?.user?.id ? user?.user?.id : user?.id
        }&status=cancel`
      );
      let copones = response.data.copons;
      setCopons(copones);
    } catch (error) {
      console.error("Error fetching cancel copouns:", error);
      setError(
        error.message || "An error occurred while fetching cancel copouns"
      );
    }
  }

  useEffect(() => {
    getCancelCopouns();
  }, []);

  return (
    isAuth && (
      <>
        <div className="container">
          <div className="row">
            <SideBarUser />

            <div className="col-md-9 mb-5 mt-5">
              <div className="row">
                <h1 className="fw-bolder">{t("copounsActive")}</h1>

                {active.length > 0 ? (
                  active.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="copones-content mt-5 text-center d-flex col-md-6"
                    >
                      <div className="item-1">
                        <h2>{coupon.code}</h2>
                        <p>{t("end-copones")}</p>
                        <span>{coupon.end_date}</span>
                      </div>
                      <div className="line"></div>
                      <div className="img-copones">
                        <img
                          className="rounded-3"
                          src={coupon.product_photo}
                          alt=""
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="item mx-auto">
                    {" "}
                    <img
                      className="w-50  "
                      src={"/assets/images/data.svg"}
                      alt="copons"
                    />
                    <p className="fw-bold m-3">{t("nocopounsActive")}</p>
                  </div>
                )}
              </div>

              {/* جزء عرض القسائم الغير فعّالة */}

              <div className="row">
                <h1 className="fw-bolder">{t("copounsnoActive")}</h1>
                {copons.length > 0 ? (
                  copons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="copones-content mt-5 text-center d-flex justify-content-around col-md-6"
                    >
                      <div className="item-1">
                        <h2>{coupon.code}</h2>
                        <p>{t("end-copones")}</p>
                        <span>{coupon.end_date}</span>
                      </div>
                      <div className="line"></div>
                      <div className="img-copones">
                        <img
                          className="rounded-3"
                          src={coupon.product_photo}
                          alt=""
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="item  mx-auto">
                    <img
                      src={"/assets/images/data.svg"}
                      className="w-50  "
                      alt=""
                    />
                    <p className="fw-bold m-3">{t("nocopounsnotActive")}</p>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
