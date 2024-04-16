"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/utils/navigation";
import Pay from "./pay";

const CartSummry = ({ code }) => {
  const { cartTotal } = useCart();
  const t = useTranslations();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const router = useRouter();

  // حساب القيمة بعد تطبيق الخصم
  const calculateDiscountedTotal = () => {
    if (code?.success) {
      return parseInt(
        cartTotal - cartTotal * (parseInt(code?.coupon?.value) / 100)
      );
    } else {
      return cartTotal;
    }
  };

  // تحديث العنصر في السلة بعد تطبيق الخصم
  const updateCartTotal = () => {
    const discountedTotal = calculateDiscountedTotal();
    localStorage.setItem("discountedTotal", JSON.stringify(discountedTotal));
    // قم بتحديث cartTotal باستخدام الدالة updateItem بدلاً من محاولة تحديثها مباشرة
    console.log(discountedTotal);
  };

  useEffect(() => {
    updateCartTotal();
  }, []);

  return (
    <>
      <div className="container">
        <div className="cart_details">
          <div className="product_details">
            <h6>{t("cart_summry_product")}</h6>
            <span>
              {cartTotal}
              <span style={{ marginLeft: "0.5em" }}>LE</span>
            </span>
          </div>

          <div
            className={`discount_details ${
              (code?.success === "Coupon successfully applied") |
              (code?.message === "Invalid coupon code, Please try again")
                ? ""
                : "d-none"
            }`}
            style={{ "padding-top": "1.2pc" }}
          >
            <h6>{t("cart_summry_discount")}</h6>
            <span>
              {code?.success
                ? t("discount_applied_success")
                : t("discount_applied_failure")}
            </span>
          </div>
          <hr style={{ paddingTop: "2.5pc" }} />
          <div
            className={`cart_total ${
              (code?.success === "Coupon successfully applied") |
              (code?.message === "Invalid coupon code, Please try again")
                ? ""
                : "mt-5"
            }`}
            style={{ "padding-bottom": "1.5pc" }}
          >
            <h5>{t("cart_summry_total")}</h5>
            <span>{calculateDiscountedTotal()} LE</span>
          </div>
          <button
            onClick={() => {
              localStorage.getItem("user")
                ? setIsModalOpened(true)
                : router.push(`/login`);
            }}
            className="cart_button"
          >
            {t("cart_summry_btn")}
          </button>
        </div>
      </div>
      {isModalOpened === true ? (
        <Pay
          isModalOpened={isModalOpened}
          setIsModalOpened={setIsModalOpened}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CartSummry;
