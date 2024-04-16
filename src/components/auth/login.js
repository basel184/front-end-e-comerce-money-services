"use client";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "@/src/Style/Posts.css";
import axios from "axios";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Link, useRouter } from "@/src/utils/navigation";
import { tokenContext } from "@/src/app/Context/tokenContext";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFB from "./SignInWithFB";
import { useTranslations, useLocale } from "next-intl";

export default function Login() {
  let { setToken } = useContext(tokenContext);
  const t = useTranslations();
  const lg = useLocale();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // eslint-disable-next-line no-undef
  const router = useRouter();
  const getData = (data) => {};

  async function register(values) {
    setIsLoading(true);
    let res = await axios
      .post(
        `https://moneyservices.store/back/public/api/login?email=${values.email}&password=${values.password}`
      )
      .catch((err) => {
        setApiError(err.response.data.message);
        setIsLoading(false);
      });

    if (res?.status === 200) {
      setIsLoading(false);
      setToken(res.data.authorization.token);
      localStorage.setItem(
        "token",
        JSON.stringify(res.data.authorization.token)
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email(t("email_not_valid"))
      .required(t("email_required")),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: function (values) {
      register(values);
    },
  });

  return (
    <div className="login">
      <div className="container my-5  bg-light  rounded-3 p-4 w-50">
        {apiError ? (
          <div className="alert alert-danger">
            {apiError === "Unauthorized" && lg === "ar"
              ? "الرقم السري غير صحيح"
              : apiError ===
                  `Attempt to read property "email_verified_at" on nul` &&
                lg === "ar"
              ? "يجب ادخال الايميل بشكل صحيح"
              : apiError === `Confirm your email` && lg === "ar"
              ? "قم بتأكيد الايميل"
              : apiError === `The password field is required.` && lg === "ar"
              ? "حقل كلمة المرور مطلوب."
              : apiError}
          </div>
        ) : (
          ""
        )}
        <form className="w-100 mx-auto" onSubmit={formik.handleSubmit}>
          <h2 className="mb-3 fw-bolder">{t("login_title")}</h2>
          <div className="form-group mb-2">
            <input
              type="email"
              className="form-control border-0 "
              id="uEmail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("login_input_email")}
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
              placeholder={t("login_input_password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}
          </div>

          {isLoading ? (
            <button className="btn d-flex me-auto bg-warning text-white">
              <i className="fa fa-spin fa-spinner"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn d-flex me-auto bg-warning text-white"
            >
              {t("login_form_btn")}
            </button>
          )}
          <div className="border-bottom my-4"></div>
          <Link href={`/register`}>
            <button className="btn bg-black text-white w-100">
              {t("login_link")}
            </button>
          </Link>
          <Link href={`/forget-password`} className="mt-2">
            {t("login_form_forget")}?
          </Link>
        </form>
      </div>
      {/* <FacebookLoginBtn /> */}
      <div className="social_buttons text-center pb-3  w-50 m-auto">
        <SignInWithFB />
        <div className="google mt-4">
          <SignInWithGoogle />
        </div>
      </div>
    </div>
  );
}
