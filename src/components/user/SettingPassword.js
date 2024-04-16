import axios from "axios";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";

export default function SettingPassword() {
  const user = JSON.parse(localStorage.getItem("user"));

  const t = useTranslations();
  const formikObj = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.new_password !== values.new_password_confirmation) {
        errors.password = "not matching password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const res = await axios
        .post(
          `https://moneyservices.store/back/public/api/change-password?current_password=${values.current_password}&new_password=${values.new_password}&new_password_confirmation=${values.new_password_confirmation}&user_id=${user.user.id}`,
          {},
          {
            headers: {
              Authorization: user.authorization.type + user.authorization.token,
            },
          }
        )
        .catch((err) => toast.error(err.message));

      if (res.status === 200) {
        toast.success(res.data.message);
      }
      // const res = await axios.post(`https://moneyservices.store/back/public/api/change-password?current_password=1111&new_password=12345&new_password_confirmation=12345`)
    },
  });
  return (
    <>
      <form action="" onSubmit={formikObj.handleSubmit}>
        <div className="input_group">
          <label htmlFor="current">{t("setting_form_current")}</label>
          <input
            type="password"
            id="current"
            onChange={formikObj.handleChange}
            name="current_password"
          />
        </div>
        <div className="input_group">
          <label htmlFor="new_password">{t("setting_form_new")}</label>
          <input
            type="password"
            id="new_password"
            onChange={formikObj.handleChange}
            name="new_password"
          />
        </div>
        <div className="input_group">
          <label htmlFor="new_password_confirmation">
            {t("setting_form_confirm")}
          </label>
          <input
            type="password"
            id="new_password_confirmation"
            onChange={formikObj.handleChange}
            name="new_password_confirmation"
          />
        </div>
        <button type="submit">{t("setting_form_btn")}</button>
      </form>
      <ToastContainer />
    </>
  );
}
