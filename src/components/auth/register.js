"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/src/Style/Posts.css";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/src/utils/navigation";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const lg = localStorage.getItem("lng");

  async function register(values) {
    try {
      setIsLoading(true);
      localStorage.setItem("ConfirmEmail", values.email);
      localStorage.setItem("ConfirmName", values.name);
      localStorage.setItem("ConfirmPassword", values.password);

      let res = await axios.post(
        `https://moneyservices.store/back/public/api/check-email?email=${values.email}`,
        values
      );
      await axios.post(
        `https://moneyservices.store/back/public/api/register?email=${values.email}&name=${values.name}&password=${values.password}`
      );
      if (res.status === 200) {
        setIsLoading(false);
        router.push(`/email-confirm`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || t("unknown_error"));
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required(t("name_required")),
    email: Yup.string()
      .email(t("email_not_valid"))
      .required(t("email_required")),
    password: Yup.string().required(t("password_required")),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: function (values) {
      register(values);
    },
  });

  return (
    <>
      <div className="container my-5 bg-light  rounded-3 p-4 w-50 ">
        <form className="w-75 mx-auto " onSubmit={formik.handleSubmit}>
          <h2 className="mb-3  fw-bolder ">{t("register_title")}</h2>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control border-0"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("register_form_name")}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger">{formik.errors.name}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mb-2">
            <input
              type="email"
              className="form-control border-0"
              id="uEmail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("register_form_email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control border-0"
              id="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("register_form_password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}
          </div>
          {isLoading ? (
            <button className="btn d-flex  me-auto  bg-warning text-white">
              <i className="fa fa-spin fa-spinner  text-center"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn d-flex me-auto bg-warning text-white   "
            >
              {t("register_form_btn")}
            </button>
          )}
        </form>
        <Link href={`/login`} className="btn bg-black text-white w-100 mt-4">
          {t("register_link")}
        </Link>
        <ToastContainer />
      </div>
    </>
  );
}
