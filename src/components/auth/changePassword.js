"use client";
import React, { useState } from "react";
import "@/src/Style/account.css";
import axios from "axios";

import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useRouter } from "../../utils/navigation";

export default function ChangPassword() {
  const t = useTranslations(); // استخدام useTranslation لتعيين المتغير t
  const email = localStorage.getItem("fEmail");
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const lang = localStorage.getItem("lng");

  const router = useRouter();
  const formikObj = useFormik({
    initialValues: {
      new_password: "",
      new_password_confirmation: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.new_password !== values.new_password_confirmation) {
        errors.new_password_confirmation = t("password_not_matching");
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (isSubmittingPassword) {
        return;
      }

      setIsSubmittingPassword(true);

      try {
        const res = await axios.get(
          `https://moneyservices.store/back/public/api/new-password?email=${email}&new_password=${values.new_password}&new_password_confirmation=${values.new_password_confirmation}`
        );

        if (res && res.status === 200) {
          toast.success(res.data.message);
          router.push(`/login`);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || t("unknown_error"));
      }

      setIsSubmittingPassword(false);
    },
  });

  return (
    <>
      <div className="container">
        <div className="row ">
          <div
            style={{ "text-align": "center" }}
            className="col-md-12 m-5 rounded-top bg-body-tertiary p-4 "
          >
            <h1 className=" fw-bold">{t("InformationPassWord")}</h1>
            <form action="" onSubmit={formikObj.handleSubmit}>
              <div className="mb-3">
                <input
                  type="pass"
                  className="form-control fw-semibold text-right"
                  placeholder={t("setting_form_new")}
                  id="new_password"
                  onChange={formikObj.handleChange}
                  name="new_password"
                />
              </div>

              <div className="mb-3">
                <input
                  className="form-control fw-semibold text-right"
                  type="password"
                  id="new_password_confirmation"
                  onChange={formikObj.handleChange}
                  name="new_password_confirmation"
                  placeholder={t("setting_form_confirm")}
                />
                {formikObj.errors.new_password_confirmation && (
                  <div className="error_message">
                    {formikObj.errors.new_password_confirmation}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-warning w-25 buttonUpdata   shadow-lg text-white"
              >
                <span className="p-3">{t("btn-update")}</span>
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
