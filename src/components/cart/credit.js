import { useTranslations } from "next-intl";

export default function Credit() {
  const t = useTranslations();
  return (
    <div className="credit">
      <label htmlFor="card">{t("cart_credit_num")}</label>
      <input type="password" />
      <div className="form_group">
        <div className="form_control">
          <label htmlFor="card">{t("cart_credit_expire")}</label>
          <input type="text" />
        </div>
        <div className="form_control">
          <label htmlFor="card">{t("cart_credit_code")}</label>
          <input type="number" />
        </div>
      </div>
    </div>
  );
}
