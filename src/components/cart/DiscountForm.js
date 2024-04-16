"use client";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getValue } from "@/src/Redux/Reducers/disconteCode";
import { useTranslations } from "next-intl";

export default function DiscountForm({ setCode }) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const { code } = useSelector((state) => state.value);

  const formikObj = useFormik({
    initialValues: {
      code: "",
    },

    onSubmit: (value) => {
      localStorage.setItem("code", value.code);

      dispatch(getValue(value.code));
      setCode(code);
    },
  });
  return (
    <form action="" onSubmit={formikObj.handleSubmit}>
      <input
        type="text"
        name="code"
        onChange={formikObj.handleChange}
        placeholder={t("cart_discount_input")}
      />
      {formikObj.errors.code && alert(t("required"))}
      <button type="submit">{t("cart_discount_btn")}</button>
    </form>
  );
}
