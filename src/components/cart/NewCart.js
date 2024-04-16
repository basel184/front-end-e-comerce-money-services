"use client";
/* eslint-disable @next/next/no-img-element */
import { useCart } from "react-use-cart";
import Box from "@mui/material/Box";

import "@/src/Style/cart.css";
import "@/src/Style/NewCart.scss";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/src/utils/navigation";
import DiscountForm from "./DiscountForm";
import CartSummry from "./CartSummry";
import CustomSlider from "./CustomSlider";

function NewCart() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const handleClick = () => {
    router.push(`/store`);
  };
  const { items, removeItem, updateItemQuantity, getItem, isEmpty, setItems } =
    useCart();

  const t = useTranslations();
  useEffect(() => {
    // حساب إجمالي السعر عند تحميل الصفحة أو عندما يتغير items
    const total = items.reduce(
      (acc, item) =>
        item.isActive == 0
          ? acc + parseFloat(item.copon) * item.quantity
          : acc + parseFloat(item.total_copon) * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [items]);
  const cartItems = localStorage.getItem("react-use-cart");
  if (cartItems.items !== undefined) {
    setItems(JSON.parse(cartItems));
  }

  return (
    <>
      {isEmpty ? (
        <div className="row">
          <div className="container pt-5" style={{ "text-align": "center" }}>
            <img
              style={{ width: "20%" }}
              src={"/assets/images/empty_car.svg"}
              alt=""
            />
            <h4 className="text-capitalize pt-5">{t("cart_empty")}</h4>
          </div>
        </div>
      ) : (
        <TableContainer
          /*         component={Paper}
           */ sx={{
            backgroundColor: "#F6F7F8",
            borderRadius: "10px",
            width: "90%",
            height: "60vh",
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
                <TableCell className="row-border" align="center">
                  {t("cart_content_photo")}
                </TableCell>
                <TableCell className="row-border" align="center">
                  {t("cart_content_name")}
                </TableCell>
                <TableCell className="row-border" align="center">
                  {t("cart_content_price")}
                </TableCell>
                <TableCell className="row-border" align="center">
                  {t("cart_content_count")}
                </TableCell>

                <TableCell className="row-border" align="center">
                  {t("cart_content_total")}
                </TableCell>
                <TableCell className="row-border" align="center">
                  {t("Redeem_product_coupons")}
                </TableCell>
                <TableCell className="row-border" align="center">
                  #
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, index) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    /*                     className="row-border"
                     */
                    className={index === items.length - 1 ? "" : "row-border"}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <img src={row?.photo[0]} alt="" id="prod-image" />
                  </TableCell>
                  <TableCell
                    className={index === items.length - 1 ? "" : "row-border"}
                    align="center"
                  >
                    {row?.title}
                  </TableCell>
                  <TableCell
                    className={index === items.length - 1 ? "" : "row-border"}
                    align="center"
                  >
                    {row?.price}
                    <span style={{ marginLeft: "0.5em" }}>LE</span>
                  </TableCell>
                  <TableCell
                    className={index === items.length - 1 ? "" : "row-border"}
                    align="center"
                  >
                    <div id="counter">
                      <button
                        className="increase"
                        onClick={() => {
                          const increase = getItem(row?.id);
                          updateItemQuantity(row?.id, increase.quantity + 1);
                        }}
                      >
                        +
                      </button>
                      <label type="number">{row?.quantity}</label>
                      <button
                        className="decrease"
                        onClick={() => {
                          const decrease = getItem(row?.id);
                          updateItemQuantity(row?.id, decrease.quantity - 1);
                        }}
                      >
                        -
                      </button>
                    </div>
                  </TableCell>

                  <TableCell
                    id="total"
                    className={index === items.length - 1 ? "" : "row-border"}
                    align="center"
                  >
                    {row?.itemTotal}
                    <span style={{ marginLeft: "0.5em" }}>LE</span>
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={row.isActive || false} // Use the isActive property if it exists, otherwise default to false
                      onChange={() => {
                        const updatedItems = items.map((item) =>
                          item.id === row.id
                            ? { ...item, isActive: !item.isActive }
                            : item
                        );
                        setItems(updatedItems);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div
                      className="remove_btn "
                      onClick={() => removeItem(row?.id)}
                    >
                      <button type="button" className="border-0">
                        <FaTrashCan
                          style={{
                            color: "#f44336",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="container mb-5 p-1">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 box">
            <div className="box">
              <Box
                className="discount_form"
                sx={{
                  marginRight: { lg: "180px", xs: "10px" },
                }}
              >
                <DiscountForm setCode={setCode} />
              </Box>
            </div>
            <CartSummry code={code} />
          </div>
          <div style={{ direction: "ltr" }} className="col-lg-6 col-md-6">
            <div className="box">
              <Link
                href="/store"
                style={{
                  backgroundColor: "#ffb61e",
                  color: "#fff",
                  borderRadius: "2px",
                  padding: "10px 20px",
                }}
                className="btn continue-st mb-3"
              >
                {t("cart_summry_shop")}
              </Link>
            </div>
            <div
              className="bg-warning text-white text-center  rounded-pill"
              style={{
                display: "flex",
                width: "194px",
                "justify-content": "space-between",
              }}
            >
              <span
                style={{
                  color: "#000",
                  padding: "1px 8px",
                  background: "#fff",
                  "border-radius": "17px",
                }}
              >
                {totalPrice}
              </span>
              <span
                style={{
                  padding: "1px 8px",
                }}
              >
                {t("numberOfCopones")}
              </span>
            </div>
            <div
              className="bg-warning clearfix text-white  text-center mt-3 mb-3 rounded-pill"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1px 8px",
                width: "294px",
              }}
            >
              {t("coupon_month")}
            </div>
            <CustomSlider />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewCart;
