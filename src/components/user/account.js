"use client";
import React, { useState } from "react";
import "@/src/Style/account.css";
import axios from "axios";

import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import SideBarUser from "./SideBarUser";
import { useTranslations } from "next-intl";
import useIsAuthUser from "../../hooks/useIsAuth";

export default function Account() {
  const isAuth = useIsAuthUser();
  const t = useTranslations();
  const [imageFile, setImageFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?.id || user?.id;

  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const formikOb = useFormik({
    initialValues: {
      name: user?.user?.name ? user?.user?.name : user?.name,
      image: null,
    },
    onSubmit: async (values) => {
      if (isSubmittingProfile) {
        return;
      }

      setIsSubmittingProfile(true);

      const { name, image } = values;
      const data = new FormData();
      data.append("name", name);
      if (image) {
        data.append("image", image);
      }

      try {
        const res = await axios.post(
          `https://moneyservices.store/back/public/api/profile/${
            user?.user?.id ? user?.user?.id : user?.id
          }`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(res);
        if (res.status === 201) {
          toast.success(res?.data?.message);
        } else {
          console.error(res.message);
        }
      } catch (err) {
        toast.error(err?.message);
      }

      try {
        const response = await fetch(
          `https://moneyservices.store/back/public/api/profile-user?user_id=${
            user?.user?.id ? user?.user?.id : user?.id
          }`
        );
        const data = await response.json();
        console.log(data.profile.photo);
      } catch (error) {
        console.log(error);
      }

      setIsSubmittingProfile(false);
    },
  });

  const formikObj = useFormik({
    initialValues: {
      current_password: "",
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
        const res = await axios.post(
          "https://moneyservices.store/back/public/api/change-password",
          {
            current_password: values.current_password,
            new_password: values.new_password,
            new_password_confirmation: values.new_password_confirmation,
            user_id: userId,
          },
          {
            headers: {
              Authorization: `${user.authorization.type} ${user.authorization.token}`,
            },
          }
        );

        if (res && res.status === 200) {
          toast.success(res.data.message);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || t("unknown_error"));
      }

      setIsSubmittingPassword(false);
    },
  });

  return (
    isAuth && (
      <>
        <div className="container">
          <div className="row">
            <SideBarUser />

            <div className="col-md-6 ">
              <div className="row ">
                <div className="col-md-10 m-5 rounded-top bg-body-tertiary p-4">
                  <h1 className="fw-bold">{t("AccountInformation")}</h1>
                  <form action="" onSubmit={formikOb.handleSubmit}>
                    <div className="input_group mb-3">
                      <label htmlFor="name">{t("setting_form_name")}</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={formikOb.handleChange}
                        value={
                          formikOb.values.name || user?.user?.name
                            ? user?.user?.name
                            : user?.name
                        }
                        className="form-control fw-semibold text-right"
                      />
                    </div>

                    <div className="input_group mb-3">
                      <label htmlFor="image">{t("setting_form_img")}</label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(event) => {
                          formikOb.setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                          );
                          setImageFile(event.currentTarget.files[0]);
                        }}
                        className="form-control fw-semibold text-right"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-warning w-25 buttonup text-center shadow-lg text-white"
                    >
                      <span className="text-center">{t("btn-update")}</span>
                    </button>
                  </form>
                  <ToastContainer />
                </div>
                <div className="row ">
                  <div className="col-md-10 m-5 rounded-top bg-body-tertiary p-4 ">
                    <h1 className=" fw-bold">{t("InformationPassWord")}</h1>
                    <form action="" onSubmit={formikObj.handleSubmit}>
                      <div class="mb-3">
                        <input
                          class="form-control fw-semibold text-right"
                          type="password"
                          placeholder={t("setting_form_current")}
                          id="current"
                          onChange={formikObj.handleChange}
                          name="current_password "
                        />
                      </div>

                      <div class="mb-3">
                        <input
                          type="password"
                          class="form-control fw-semibold text-right"
                          placeholder={t("setting_form_new")}
                          id="new_password"
                          onChange={formikObj.handleChange}
                          name="new_password"
                        />
                      </div>

                      <div class="mb-3">
                        <input
                          class="form-control fw-semibold text-right"
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
                        <span>{t("btn-update")}</span>
                      </button>
                    </form>
                  </div>
                  <ToastContainer />
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
