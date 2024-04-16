"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { useFormik } from "formik";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "@/src/Style/OrdersEmanStyles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ToastContainer, toast } from "react-toastify";
import SideBarUser from "../user/SideBarUser";
import { useLocale, useTranslations } from "next-intl";

export default function Orders() {
  const t = useTranslations();
  const locale = useLocale();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userOrders, setUserOrders] = useState([]);

  const [expandedOrders, setExpandedOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [number, setInumber] = useState({});
  const [userDetailsOrders, setUserDetailsOrders] = useState([]);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen1, setModalOpen1] = useState(false);
  const [orderCodeToCancel, setOrderCodeToCancel] = useState(null);
  const [productRating, setProductRating] = useState(0);
  const [orderCodeToRating, setOrderCodeToRating] = useState(null);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleCloseModal1 = () => {
    setModalOpen1(false);
  };
  const modalStyle = {
    content: {
      maxWidth: "50%",
      minWidth: "300px",
      margin: "auto auto",
      backgroundColor: "white",
      border: "3px solid #FFA81E",
      borderRadius: "20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const handleCancelOrder2 = (codeOrder) => {
    setOrderCodeToCancel(codeOrder);
    setModalOpen(true);
  };
  const handleRating = (codeOrder) => {
    setOrderCodeToRating(codeOrder);
    setModalOpen1(true);
  };
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://moneyservices.store/back/public/api/order-show?user_id=${
          user?.user?.id ? user?.user?.id : user?.id
        }`
      );
      let res = response.data.orders.data;
      setUserOrders(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders. Please try again later.");
      setLoading(false);
    }
  };
  const formikObj = useFormik({
    initialValues: {
      title: "",
      rate: productRating,
    },
    onSubmit: (values) => {
      sentData(values);
    },
    validate: (values) => {
      const error = {};
      if (values.title.length === 0) {
        error.title = t("required");
      }
      if (productRating === 0) {
        error.rate = t("required");
      }
      return error;
    },
  });
  useEffect(() => {
    // Set the appElement to the root element of your application
    Modal.setAppElement(document.getElementById("root")); // Replace 'root' with the ID of your root element
  }, []);
  useLayoutEffect(() => {
    fetch("https://moneyservices.store/back/public/api/contact-us")
      .then((res) => res.json())
      .then((data) => {
        setInumber(data?.data);
      });
  }, []);
  const handleConfirm = async () => {
    try {
      let iframURL = `https://api.whatsapp.com/send?text=اريد الغاء هذا الاوردر ${orderCodeToCancel}&phone=2${number?.whatsapp}`;
      window.open(
        iframURL,
        "_blank",
        "width=600, height=400, resizable=yes, scrollbars=yes"
      );
      const res = await axios.post(
        `https://moneyservices.store/back/public/api/cancel-order/${orderCodeToCancel}?user_id=${
          user?.user?.id ? user?.user?.id : user?.id
        }`
      );

      setModalOpen(false);
      console.log(res.data.message);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || t("unknown_error"));
    }
  };
  const sentData = async ({ title, rate }) => {
    try {
      const res = await axios.post(
        `https://moneyservices.store/back/public/api/product/${orderCodeToRating}/review?rate=${productRating}&user_id=${
          user?.user?.id ? user?.user?.id : user?.id
        }&review=${title}`
      );

      setModalOpen1(false);
      console.log(res.data.message);
      toast.success(
        res.data.message === "You have been rated this product"
          ? "لقد تم تقييمك لهذا المنتج من قبل"
          : res.data.message === "You have been rated this product"
          ? "شكرا لك على ملاحظاتك"
          : res.data.message
      );
    } catch (err) {
      toast.error(err.response?.data?.message || t("unknown_error"));
    }
  };
  const fetchDetailsOrders = async (codeOrder, id) => {
    setIsFetchingDetails(true);
    try {
      const response = await axios.get(
        `https://moneyservices.store/back/public/api/order-show/${codeOrder}?user_id=${
          user?.user?.id ? user?.user?.id : user?.id
        }`
      );
      let res = response.data.orders;
      setUserDetailsOrders(res);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Error fetching order details. Please try again later.");
    } finally {
      setIsFetchingDetails(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrderDetails = async (orderId, codeOrder) => {
    if (isFetchingDetails) {
      return; // Do not send multiple requests for the same order details simultaneously
    }

    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));

    if (!expandedOrders[orderId]) {
      await fetchDetailsOrders(codeOrder);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userOrders || userOrders.length === 0) {
    return (
      <>
        <div className="container">
          <div className="row">
            <SideBarUser />
            <div
              className="col-md-9 mt-5 me-auto "
              style={{ "text-align": "center" }}
            >
              <div className="item mx-auto">
                <h3 className="fw-bold m-3">{t("There_orders")}</h3>
              </div>
              <img
                className="w-50  "
                src={"assets/images/nothing_here.svg"}
                alt="copons"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="row mt-5 mb-5">
          <SideBarUser />
          <div className="col-md-9">
            <TableContainer
              sx={{
                backgroundColor: "#F6F7F8",
                borderRadius: "10px",
                width: "95%",
                height: "100vh",
                margin: "50px auto",
              }}
            >
              <Table
                sx={{ minWidth: 650 }}
                size="medium"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="row-border bg-warning text-white"
                      align="center"
                    >
                      {t("order_of_code")}
                    </TableCell>
                    <TableCell
                      className="row-border bg-warning text-white"
                      align="center"
                    >
                      {t("order_of_place")}
                    </TableCell>
                    <TableCell
                      className="row-border bg-warning text-white"
                      align="center"
                    >
                      {t("order_of_total")}
                    </TableCell>
                    <TableCell
                      className="row-border bg-warning text-white"
                      align="center"
                    >
                      {t("order_of_state")}
                    </TableCell>
                    <TableCell
                      className="row-border bg-warning text-white"
                      align="center"
                    >
                      {t("order_of_details_order")}
                    </TableCell>
                    <TableCell
                      className="row-border bg-warning text-white"
                      align="center"
                    >
                      {t("cancel")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrders.map((row, index) => (
                    <React.Fragment key={row?.id}>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        className={
                          index === userOrders.length - 1 ? "" : "row-border"
                        }
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row?.code_order}
                        </TableCell>
                        <TableCell align="center row-border">
                          {row?.area}
                        </TableCell>
                        <TableCell align="center">
                          {row?.total_amount}
                          <span style={{ marginLeft: "0.5em" }}>LE</span>
                        </TableCell>
                        <TableCell align="center row-border">
                          {locale === "ar" ? (
                            <>
                              {row?.status === "new" && "جديد"}
                              {row?.status === "process" && "قيد التنفيذ"}
                              {row?.status === "Replaced with coupons" &&
                                "تم استبدالها بالكوبونات"}
                              {row?.status === "delivered" && "تم التوصيل"}
                              {row?.status === "cancel" && "تم الإلغاء"}
                            </>
                          ) : (
                            row?.status
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="row-border"
                          style={{ color: "#fff" }}
                        >
                          <p
                            onClick={() =>
                              toggleOrderDetails(index, row.code_order)
                            }
                            style={{
                              background: "#ffb61e",
                              padding: "10px",
                              borderRadius: "17px",
                            }}
                          >
                            {t("order_of_showDetails")}
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              className="text-white"
                            />
                          </p>
                          <Modal isOpen={isModalOpen1} style={modalStyle}>
                            <button
                              style={{ display: "block" }}
                              className="modal-btn-close"
                              onClick={handleCloseModal1}
                            >
                              <FontAwesomeIcon
                                icon={faXmark}
                                style={{ fontSize: "30px" }}
                              />
                            </button>
                            <div className="row mt-5">
                              <div
                                style={{ marginTop: "1pc" }}
                                className="container text-center"
                              >
                                <form
                                  action=""
                                  onSubmit={formikObj.handleSubmit}
                                >
                                  <div>
                                    <label htmlFor="title">
                                      {t("add_reviews_title")}:
                                    </label>
                                    <input
                                      type="text"
                                      name="title"
                                      id="title"
                                      className="form-control mt-3"
                                      onChange={formikObj.handleChange}
                                      value={formikObj.values.title}
                                    />
                                    {formikObj.errors.title && (
                                      <p className=" text-danger">
                                        {formikObj.errors.title}
                                      </p>
                                    )}
                                  </div>
                                  <div className="mt-3">
                                    <label htmlFor="rate">
                                      {t("add_reviews_rate")}:
                                    </label>
                                    <div style={{ marginTop: "5px" }}>
                                      {[1, 2, 3, 4, 5].map((star, index) => (
                                        <span
                                          key={index}
                                          style={{
                                            cursor: "pointer",
                                            fontSize: "24px",
                                            color:
                                              star <= productRating
                                                ? "gold"
                                                : "gray",
                                          }}
                                          onClick={() => setProductRating(star)}
                                        >
                                          ★
                                        </span>
                                      ))}
                                    </div>
                                    {formikObj.errors.title && (
                                      <p className=" text-danger">
                                        {formikObj.errors.rate}
                                      </p>
                                    )}
                                  </div>
                                  <button
                                    className="btn btn-success mt-3"
                                    type="submit"
                                  >
                                    {t("add_reviews_btn")}
                                  </button>
                                </form>
                              </div>
                            </div>
                          </Modal>
                          <Modal isOpen={isModalOpen} style={modalStyle}>
                            <button
                              style={{ display: "block" }}
                              className="modal-btn-close"
                              onClick={handleCloseModal}
                            >
                              <FontAwesomeIcon
                                icon={faXmark}
                                style={{ fontSize: "30px" }}
                              />
                            </button>
                            <div className="row mt-5">
                              <div
                                style={{ marginTop: "10pc" }}
                                className="container text-center"
                              >
                                <h1>{t("confirm_cancel")}</h1>
                                <button
                                  className="btn btn-danger"
                                  onClick={handleConfirm}
                                >
                                  {t("yes")}
                                </button>
                              </div>
                            </div>
                          </Modal>
                        </TableCell>
                        <TableCell
                          style={{
                            display: row.status != "new" ? "none" : "block",
                          }}
                          align="center"
                        >
                          <img
                            type="button"
                            alt=""
                            onClick={() => handleCancelOrder2(row.code_order)}
                            src={"/assets/images/cancel.png"}
                          />
                        </TableCell>
                      </TableRow>
                      {expandedOrders[index] && (
                        <TableRow>
                          <TableCell colSpan="5">
                            <Table>
                              <TableHead>
                                <TableRow className="bg-white">
                                  <TableCell className="text-center row-border">
                                    {t("order_of_photo")}
                                  </TableCell>
                                  <TableCell className="text-center row-border">
                                    {t("order_name_product")}
                                  </TableCell>
                                  <TableCell className="text-center row-border">
                                    {t("order_of_price")}
                                  </TableCell>
                                  <TableCell className="text-center row-border">
                                    {t("order_of_amount")}
                                  </TableCell>
                                  <TableCell className="text-center row-border">
                                    {t("order_of_total_price")}
                                  </TableCell>
                                  <TableCell className="text-center row-border">
                                    {t("add_reviews_rate")}
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody className="bg-white">
                                {userDetailsOrders &&
                                  userDetailsOrders.map((orderDetail) => (
                                    <TableRow key={orderDetail.id}>
                                      <TableCell className="text-center">
                                        <img
                                          style={{ width: "100px" }}
                                          className="img-details rounded-3"
                                          src={orderDetail.products?.photo}
                                          alt=""
                                        />
                                      </TableCell>
                                      <TableCell className="text-center row-border">
                                        {orderDetail.products?.title_arabic}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {orderDetail.price}
                                      </TableCell>
                                      <TableCell className="numberquailty text-center">
                                        <div className="btn btn-warning w-50">
                                          {orderDetail.quantity}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {parseFloat(orderDetail.price) *
                                          parseFloat(orderDetail.quantity)}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <img
                                          type="button"
                                          alt=""
                                          onClick={() =>
                                            handleRating(
                                              orderDetail.products?.slug
                                            )
                                          }
                                          src={
                                            "/assets/images/satisfaction.png"
                                          }
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
