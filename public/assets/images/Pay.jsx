import { useFormik } from "formik"
import { useState } from "react";
import { useTranslation } from "react-i18next"
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function Pay() {
    const [active, setActive] = useState(false);
    const {t} = useTranslation();
    const navicate = useNavigate();

    const lang = localStorage.getItem("lng")


    const formikObj = useFormik({
        initialValues: {
            cov: "",
            name: "",
            phone: "",
            city: "",
            area: "",
            streat: "",
            home: ""
        },
      
    })
    return (
            <div className="overly">
        <div className="box">
            <form action="" onSubmit={formikObj.handleSubmit}>
                <div className="form_control">
                    <label htmlFor="cov">{t("cart_pay_governorate")}</label>
                    <input type="text" id="cov" name="cov" onChange={formikObj.handleChange} value={formikObj.values.cov} />
                </div>
                <div className="form_control">
                    <label htmlFor="name">{t("cart_pay_name")}</label>
                    <input type="text" id="cov" name="name" onChange={formikObj.handleChange} value={formikObj.values.name} />
                </div>
                <div className="form_control">
                    <label htmlFor="phone">{t("cart_pay_phone")}</label>
                    <input type="text" id="phone" name="phone" onChange={formikObj.handleChange} value={formikObj.values.phone} />
                </div>
                <div className="form_control">
                    <label htmlFor="city">{t("cart_pay_city")}</label>
                    <input type="text" id="city" name="city" onChange={formikObj.handleChange} value={formikObj.values.city} />
                </div>
                <div className="form_control">
                    <label htmlFor="area">{t("cart_pay_area")}</label>
                    <input type="text" id="area" name="area" onChange={formikObj.handleChange} value={formikObj.values.area} />
                </div>
                <div className="form_control">
                    <label htmlFor="streat">{t("cart_pay_streat")}</label>
                    <input type="text" id="streat" name="streat" onChange={formikObj.handleChange} value={formikObj.values.streat} />
                </div>
                <div className="form_control">
                    <label htmlFor="home">{t("cart_pay_home")}</label>
                    <input type="text" id="home" name="home" onChange={formikObj.handleChange} value={formikObj.values.home} />
                </div>
            <div className="pay_operation">
                <div className={`pay_action_credit ${active === true && "active"}`} onClick={() => {
                    setActive(true)
                    navicate(`/${lang}/cart/pay`)
                }}>
                    <FaCreditCard />
                    <h4>{t("cart_pay_credit")}</h4>
                </div>
                <div className={`pay_action_money ${active === false && "active"}`} onClick={() => {
                    setActive(false)
                    navicate(`/${lang}/cart/pay/credit`)
                }}>
                    <FaMoneyBill />
                    <h4>{t("cart_pay_money")}</h4>
                </div>
            </div>
                <Outlet />
            <button type="submit" className="pay_confirm">{t("cart_pay_confirm")}</button>
            </form>
            <div className="close_btn">x</div>
        </div>
    </div>
    )
}