"use client";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Link, useRouter } from "../../utils/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function EmailConfirm() {
  const locale = useLocale();
  const ConfirmEmail =
    typeof window !== "undefined" && localStorage.getItem("ConfirmEmail");
  const router = useRouter();

  const t = useTranslations();
  const formikObj = useFormik({
    initialValues: {
      email: ConfirmEmail,
    },
    validate: (value) => {
      const errors = {};
      if (value.email.length === 0) {
        errors.email = t("required");
      }
    },

    onSubmit: async (value) => {
      // تخزين البريد الإلكتروني في localStorage
      localStorage.setItem("forgottenEmail", value.email);

      locale === "ar"
        ? toast.success("انتظر قليلا لأرسال الكود")
        : toast.success("Wait a little to send the code");

      const res = await axios.get(
        `https://moneyservices.store/back/public/api/confirmation-message/${value?.email}`
      );
      if (res.status === 200) {
        toast.success("A message has been sent to your email");
        router.push(`/token-confirm`);
      } else {
        toast.error(res.response.data.message);
      }
    },
  });

  return (
    <div
      className="my-5 bg-light  rounded-3 p-4"
      style={{ textAlign: "center" }}
    >
      <h2 className="mb-3">{t("email_confirm")}</h2>
      <form action="" onSubmit={formikObj.handleSubmit}>
        <input
          value={ConfirmEmail}
          type="email"
          placeholder="your_email@mail.com"
          style={{ width: "40%", borderColor: "#ddd" }}
          onChange={formikObj.handleChange || ConfirmEmail}
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
