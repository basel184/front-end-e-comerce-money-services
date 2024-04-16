/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "react-use-cart";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/src/utils/navigation";

export default function Pay({ isModalOpened, setIsModalOpened }) {
  const t = useTranslations();
  const { emptyCart, items } = useCart();
  const cartTotal =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("discountedTotal"));
  const [governorates, setGovernorates] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [shippingCash, setShippingCash] = useState("");
  const locale = useLocale();
  const language = locale === "ar" ? "arabic" : "english";

  const user = JSON.parse(localStorage.getItem("user"));
  const order_id = localStorage.getItem("order_id");
  const fawryPay = localStorage.getItem("fawryid");
  const userId = user?.user?.id || user?.id;
  const products = items.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    color: item.product_color,
    size: item.product_size,
    replace_to_coupon: item.isActive || 0,
  }));
  const products2 = items.map((item) => ({
    name: item.title,
    quantity: item.quantity,
    description: item.product_color && item.product_size,
    amount_cents: parseFloat(item.price) * 100,
  }));
  const router = useRouter();

  const API =
    "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRek9UVXdMQ0p1WVcxbElqb2lNVGN3TVRVMk1qa3dOUzR3TVRJd01qRWlmUS5LWVNVWF9XR1BWdXFZMzFrVURtaDR3aU9yTXdRWGR5SkZkR251d1NSOS0wSjRUSTQxUHpFdkxXLTZiV0pIUFlpd0FQbjQ4UUIzY1hJLXgzQlN5VnBqUQ==";

  const formPay = async (values) => {
    try {
      const res = await axios.post(
        "https://moneyservices.store/back/public/api/order-cart",
        values
      );
      toast.success(res.data.message);
      if (formik.values.payment_status === "kiosk") {
        if (language === "en") {
          Swal.fire({
            title:
              "<span style='color:#785d0c'>The request was created!</span>",
            html: `
            <p class="text-secondary" style='font-size:18px'>: Request reference number</p>
            <p class="btn btn-success" style='font-size:20px'> ${fawryPay}</p>
            <p class="text-danger" style='font-size:16px'>Expires after 72 hours</p>
            <p class="text-white bg-dark" style='font-size:18px'>Total: ${formik.values.total_amount} EG</p>
          `,
            icon: "success",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "<span style='color:#785d0c'>تم إنشاء الطلب !</span>",
            html: `
            <p class="text-secondary" style='font-size:18px'>رقم المرجعي للطلب :</p>
            <p class="btn btn-success" style='font-size:20px'> ${formik.values.ref_num}</p>
            <p class="text-danger" style='font-size:16px'>تنتهي خلال 72 ساعة</p>
            <p class="text-white bg-dark" style='font-size:18px'>الإجمالي: ${formik.values.total_amount} جنيه مصري</p>
          `,
            icon: "success",
            confirmButtonText: "إغلاق",
          });
        }
      }
      emptyCart();
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const formPay2 = async (values, id, ress) => {
    try {
      const updatedValues = {
        ...values,
        order_id: id,
        ref_num: ress,
      };

      // تحديث حالة الـ formik
      formik.setValues(updatedValues);
      const res = await axios.post(
        "https://moneyservices.store/back/public/api/order-cart",
        updatedValues
      );
      if (formik.values.payment_status === "cash") {
        toast.success(res.data.message);
      }
      if (formik.values.payment_status === "kiosk") {
        if (language === "en") {
          Swal.fire({
            title:
              "<span style='color:#785d0c'>The request was created!</span>",
            html: `
             <p class="text-secondary" style='font-size:18px'>: Request reference number</p>
             <p class="btn btn-success" style='font-size:20px'> ${updatedValues.ref_num}</p>
             <p class="text-danger" style='font-size:16px'>Expires after 72 hours</p>
             <p class="text-white bg-dark" style='font-size:18px'>Total: ${formik.values.total_amount} EG</p>
           `,
            icon: "success",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "<span style='color:#785d0c'>تم إنشاء الطلب !</span>",
            html: `
             <p class="text-secondary" style='font-size:18px'>رقم المرجعي للطلب :</p>
             <p class="btn btn-success" style='font-size:20px'> ${updatedValues.ref_num}</p>
             <p class="text-danger" style='font-size:16px'>تنتهي خلال 72 ساعة</p>
             <p class="text-white bg-dark" style='font-size:18px'>الإجمالي: ${formik.values.total_amount} جنيه مصري</p>
           `,
            icon: "success",
            confirmButtonText: "إغلاق",
          });
        }
      }
      emptyCart();
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const [payment_status, setSelectedOption] = useState("");
  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    formik.setValues({
      ...formik.values,
      payment_status: selectedValue,
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    area: Yup.string().required("City is required"),
    payment_status: Yup.string().required("payment status is required"),
    governorate: Yup.string().required("governorate is required"),
  });

  const formik = useFormik({
    initialValues: {
      governorate_id: "",
      name: user?.user?.name || user?.name,
      phone: "",
      email: user?.user?.email || user?.email,
      area: "",
      payment_status: "",
      shipping: "",
      products: products,
      user_id: userId,
      total_amount: "0",
    },

    onSubmit: (values) => {
      if (formik.values.payment_status === "cash") {
        formPay(values);
      } else {
        first();
      }
    },
    validationSchema: validationSchema,
  });

  const calculateTotalAmount = (shippingCa, cartTotal) => {
    const shippingCash = parseFloat(shippingCa || 0);
    const total = parseFloat(cartTotal || 0);
    let shipping_t = parseFloat(
      governorates.find((governorate) => governorate.governorate)?.price || 0
    );
    return (shippingCash + total + shipping_t).toString();
  };

  const first = async () => {
    const data = {
      api_key: API,
    };

    const request = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let response = await request.json();
    let token = response.token;
    secondStep(token);
  };

  const secondStep = async (token) => {
    let data = {
      auth_token: token,
      delivery_needed:
        formik.values.payment_status === "cash" ? "true" : "false",
      amount_cents: parseFloat(formik.values.total_amount) * 100,
      currency: "EGP",
      items: products2,
    };

    let request = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    let response = await request.json();
    let id = response.id;
    thirdStep(token, id);
  };

  const thirdStep = async (token, id) => {
    let data = {
      auth_token: token,
      amount_cents: parseFloat(formik.values.total_amount) * 100,
      expiration: 3600,
      order_id: id,
      items: products2,
      billing_data: {
        email: formik.values.email || user?.user?.email || user?.email,
        first_name: formik.values.name,
        street: formik.values.area,
        phone_number: formik.values.phone,
        last_name: formik.values.name,
        city: governorates.find((governorate) => governorate.governorate)
          .governorate,
        country: "Egypt",
        building: formik.values.area,
        apartment: formik.values.area,
        floor: formik.values.area,
      },
      currency: "EGP",
      integration_id: 4399785,
    };
    let request = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    let response = await request.json();
    let Ttoken = response.token;

    if (formik.values.payment_status === "card") {
      formPay2(formik.values, id);
      await cardPayment(Ttoken);
    } else {
      await four(Ttoken, id);
    }
  };

  const cardPayment = async (Ttoken) => {
    let iframURL = `https://accept.paymob.com/api/acceptance/iframes/806135?payment_token=${Ttoken}`;
    window.open(iframURL, "_blank");
  };

  const four = async (Ttoken, id) => {
    console.log("sdad", id);
    let data = {
      source: {
        identifier: "AGGREGATOR",
        subtype: "AGGREGATOR",
      },
      payment_token: Ttoken,
    };

    // إرسال الطلب والانتظار للحصول على الرد
    fetch(" https://accept.paymob.com/api/acceptance/payments/pay", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => res.id)
      .then((res) => formPay2(formik.values, id, JSON.stringify(res)));
  };

  const handleGovernorateChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedGovernorate(selectedValue);
    setShippingCash(selectedValue);
    const selectedGovernorateData = governorates.find(
      (governorate) => governorate.id === parseInt(selectedValue, 10)
    );
    formik.setValues({
      ...formik.values,
      governorate_id: selectedValue,
      shipping: selectedGovernorateData.price,
      shippingC: selectedGovernorateData.shipping_cash,
    });
    console.log("ShippingC:", selectedGovernorateData.shipping_cash);
  };

  useEffect(() => {
    if (formik.values.payment_status === "cash") {
      formik.setValues({
        ...formik.values,
        total_amount: calculateTotalAmount(formik.values.shippingC, cartTotal),
      });
    } else {
      let shipping_t = parseFloat(
        governorates.find((governorate) => governorate.governorate)?.price || 0
      );
      formik.setValues({
        ...formik.values,
        total_amount: (shipping_t + parseFloat(cartTotal)).toString(),
      });
    }
  }, [formik.values.payment_status, formik.values.shippingC, cartTotal]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://moneyservices.store/back/public/api/shipping?locale=${language}`
        )
        .then((response) => {
          setGovernorates(response.data);
          setGovernorates(response.data.shippings);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [language]);

  const handleModalClose = () => {
    setIsModalOpened((prev) => !prev);
  };

  const renderCashOption = () => {
    return items.some((item) => !item.isActive) ? (
      <option value="cash">{t("cart_pay_cash")}</option>
    ) : null;
  };

  return (
    <>
      {isModalOpened && (
        <div className="overly">
          <div className="box w-50">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleModalClose}
            ></button>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="form_control">
                  <label htmlFor="governorate" className="w-100">
                    {t("cart_pay_gover")}
                  </label>
                  <div className="d-flex align-items-between">
                    <select
                      id="governorate"
                      name="governorate"
                      className="form-select"
                      onChange={(e) => {
                        handleGovernorateChange(e);
                        formik.handleChange(e);
                      }}
                      value={selectedGovernorate}
                    >
                      <option value="" disabled>
                        {t("cart_pay_gover")}
                      </option>
                      {Array.isArray(governorates) ? (
                        governorates.map((governorate) => (
                          <option key={governorate.id} value={governorate.id}>
                            {governorate.governorate}
                          </option>
                        ))
                      ) : (
                        <option value="">اي حاجه</option>
                      )}
                    </select>

                    {selectedGovernorate && (
                      <div className="ml-2 p-2 ">
                        {t("Shipping Cost")}:{" "}
                        {
                          governorates.find(
                            (g) => g.id === parseInt(selectedGovernorate)
                          ).price
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form_control">
                <label htmlFor="area">{t("cart_pay_city")}</label>

                <input
                  type="text"
                  id="area"
                  className="form_control"
                  name="area"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.area}
                />
                {formik.errors.area && formik.touched.area ? (
                  <div
                    className="alert alert-danger"
                    style={{ maxHeight: "40px" }}
                  >
                    {formik.errors.area}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form_control">
                <label htmlFor="name">{t("cart_pay_name")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name || user?.user?.name || user?.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div
                    className="alert alert-danger"
                    style={{ maxHeight: "40px" }}
                  >
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form_control">
                <label htmlFor="uEmail">{t("cart_pay_email")}</label>
                <input
                  type="email"
                  id="uEmail"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.email || user?.user?.email || user?.email
                  }
                />
                {formik.errors.email && formik.touched.email ? (
                  <div
                    className="alert alert-danger"
                    style={{ maxHeight: "40px" }}
                  >
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form_control">
                <label htmlFor="phone">{t("cart_pay_phone")}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <label
                    className="alert alert-danger "
                    style={{ maxHeight: "40px" }}
                  >
                    {formik.errors.phone}
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="pay_operation">
                <label className="text-black  " htmlFor="payment_status">
                  <select
                    className="form-select"
                    id="payment_status"
                    value={payment_status}
                    onChange={handleOptionChange}
                  >
                    <option value="" disabled defaultValue>
                      {t("cart_pay_choose")}
                    </option>

                    <option value="card">{t("cart_pay_credit")}</option>
                    <option value="kiosk">{t("cart_pay_money")}</option>
                    {renderCashOption()}
                  </select>
                  {formik.errors.payment_status &&
                  formik.touched.payment_status ? (
                    <label
                      className="alert alert-danger "
                      style={{ maxHeight: "40px" }}
                    >
                      {formik.errors.payment_status}
                    </label>
                  ) : (
                    ""
                  )}
                </label>
              </div>
              <button className="btn bg-warning w-100 mt-3" type="submit">
                {t("cart_pay_submit")}
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
