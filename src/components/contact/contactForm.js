"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";

export default function ContactForm() {
  const t = useTranslations();
  async function sendData(values) {
    const { name, email, phone, msg } = values;
    const res = await axios.post(
      `https://moneyservices.store/back/public/api/send-email?name=${name}&phone=${phone}&email=${email}&details=${msg}`
    );
    if (res.status === 200) {
      toast.success(res.data.message);
    }
  }
  const formikObj = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      msg: "",
    },
    validate: (value) => {
      const error = {};
      if (value.name.length === 0) {
        error.name = t("required");
      }
      if (value.email.length === 0) {
        error.email = t("required");
      }
      if (value.phone.length === 0) {
        error.phone = t("required");
      }
      if (value.msg.length === 0) {
        error.msg = t("required");
      }
      return error;
    },
    onSubmit: (value) => {
      sendData(value);
    },
  });
  return (
    <>
      <form action="" onSubmit={formikObj.handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={formikObj.handleChange}
          value={formikObj.values.name}
          placeholder={t("contact_input_name")}
        />
        {formikObj.errors.name && (
          <div className="errors">{formikObj.errors.name}</div>
        )}
        <input
          type="email"
          name="email"
          onChange={formikObj.handleChange}
          value={formikObj.values.email}
          placeholder={t("contact_input_email")}
        />
        {formikObj.errors.email && (
          <div className="errors">{formikObj.errors.email}</div>
        )}
        <input
          type="text"
          name="phone"
          onChange={formikObj.handleChange}
          value={formikObj.values.phone}
          placeholder={t("contact_input_phone")}
        />
        {formikObj.errors.phone && (
          <div className="errors">{formikObj.errors.phone}</div>
        )}
        <textarea
          type="text"
          name="msg"
          onChange={formikObj.handleChange}
          value={formikObj.values.msg}
          placeholder={t("contact_input_message")}
        />
        {formikObj.errors.msg && (
          <div className="errors">{formikObj.errors.msg}</div>
        )}
        <button type="submit" className="form_btn">
          {t("contact_input_btn")}
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
