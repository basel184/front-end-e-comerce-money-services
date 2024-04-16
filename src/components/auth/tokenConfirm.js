"use client";
import React, { useState } from "react";
import "@/src/Style/account.css";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "../../utils/navigation";
export default function TokenCOnform() {
  const router = useRouter();
  const t = useTranslations();
  const [isSubmittingToken, setIsSubmittingToken] = useState(false);
  const email = localStorage.getItem("forgottenEmail");
  const ConfirmName = localStorage.getItem("ConfirmName");
  const ConfirmPassword = localStorage.getItem("ConfirmPassword");
  const lang = useLocale();

  const formikObj = useFormik({
    initialValues: {
      new_password: "",
    },
    onSubmit: async (values) => {
      if (isSubmittingToken) {
        return;
      }

      setIsSubmittingToken(true);

      try {
        const res = await axios.post(
          `https://moneyservices.store/back/public/api/confirm-email?email=${email}&token=${values.new_password}`
        );

        if (res && res.status === 200) {
          toast.success(res.data.message);

          router.push(`/login`);
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message ===
            "The email or confirmation number is incorrect" && lang === "ar"
            ? "البريد الإلكتروني أو رقم التأكيد غير صحيح"
            : err.response?.data?.message
        );
      }

      setIsSubmittingToken(false);
    },
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 rounded-top bg-body-tertiary p-4 text-center">
            <h1 className="fw-bold">{t("Enter_code_email")}</h1>
            <form action="" onSubmit={formikObj.handleSubmit}>
              <div className="mb-3">
                <h3>{email}</h3>
                <p>{t("Enter_code_email2")}</p>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="new_password"
                  style={{ color: "rgb(255 167 26)", fontSize: "30px" }}
                >
                  {t("confirm_token")}
                </label>
                <input
                  type="password"
                  className="form-control fw-semibold"
                  id="new_password"
                  onChange={formikObj.handleChange}
                  name="new_password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning w-25 buttonUpdata shadow-lg text-white"
              >
                <span className="p-3">{t("btn-update")}</span>
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
