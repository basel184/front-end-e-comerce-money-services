"use client";
import { Link, useRouter } from "@/src/utils/navigation";
import axios from "axios";
import { useFormik } from "formik";
import { useLocale, useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";

export default function ForgetPassword() {
  const t = useTranslations();
  const lang = useLocale();
  const router = useRouter();

  const formikObj = useFormik({
    initialValues: {
      email: "",
    },
    validate: (value) => {
      const errors = {};
      if (value.email.length === 0) {
        errors.email = t("required");
      }
    },
    onSubmit: async (value) => {
      localStorage.setItem("fEmail", value?.email);
      lang === "ar"
        ? toast.success("انتظر قليلا لأرسال الكود")
        : toast.success("Wait a little to send the code");
      const res = await axios.post(
        `https://moneyservices.store/back/public/api/sendLink?email=${value?.email}`
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        router.push(`/token-forget`);
      } else {
        toast.error(res.response.data.message);
      }
    },
  });
  return (
    <div
      className="my-5  bg-light  rounded-3 p-4"
      style={{ textAlign: "center" }}
    >
      <h2 className="mb-3">{t("login_form_forget")}</h2>
      <form action="" onSubmit={formikObj.handleSubmit}>
        <input
          type="email"
          placeholder="your_email@mail.com"
          style={{ width: "40%", borderColor: "#ddd" }}
          onChange={formikObj.handleChange}
          name="email"
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#ffb61e",
            borderColor: "#ffb61e",
            color: "#fff",
            width: "20%",
          }}
        >
          {t("forget_btn")}
        </button>
      </form>
      <Link className="btn btn-danger mt-3" href={`/login`}>
        {t("forget_redrect")}
      </Link>
      <ToastContainer />
    </div>
  );
}
