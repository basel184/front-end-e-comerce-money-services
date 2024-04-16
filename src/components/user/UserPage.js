"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect } from "react";
import { useState } from "react";

import { FaTicket } from "react-icons/fa6";
import "@/src/Style/Profile.css";
import { useTranslations } from "next-intl";
import UserOrder from "./UserOrder";

export default function UserPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState({});
  const [copone, setCopone] = useState([]);
  const [cancel, setCancel] = useState([]);
  const [order, setOrder] = useState([]);
  const [tap, setTap] = useState(false);
  const t = useTranslations();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/profile-user?user_id=${
        user?.user?.id ? user?.user?.id : user?.id
      }`
    )
      .then((res) => {
        console.log(userInfo);
        return res.json();
      })
      .then((data) => setUserInfo(data?.profile));
    // console.log(data);
    fetch(
      `https://moneyservices.store/back/public/api/copons?user_id=${
        user?.user?.id ? user?.user?.id : user?.id
      }&status=active`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCopone(data?.copons);
      });
    fetch(
      `https://moneyservices.store/back/public/api/copons?user_id=${
        user?.user?.id ? user?.user?.id : user?.id
      }&status=cancel`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCancel(data?.copons);
      });
    fetch(
      `https://moneyservices.store/back/public/api/order-show?user_id=${
        user?.user?.id ? user?.user?.id : user?.id
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((order) => {
        setOrder(order);
      });
  }, []);

  console.log(userInfo);

  return (
    <div className="user">
      <div className="container">
        <div className="user_info">
          <div className="img">
            {userInfo?.photo ? (
              <img src={userInfo?.photo} alt={userInfo?.name} />
            ) : (
              <img src={"/assets/images/profile_img.webp"} alt="" />
            )}
          </div>
          <div className="user_details">
            <h4 className="user_name">{userInfo?.name}</h4>
          </div>
        </div>
        <div className="user_copones">
          <div className="copone_tap">
            <h4 className="copone_head" onClick={() => setTap(false)}>
              {t("user_copone_active")} ({copone?.length})
            </h4>
            <h4 className="copone_head" onClick={() => setTap(true)}>
              {t("user_copone_cancel")} ({cancel?.length})
            </h4>
          </div>
          {tap === false ? (
            <div className="row">
              {copone?.map((el) => {
                return (
                  <div
                    className="col-lg-3 col-md-6 col-sm-12 copone"
                    key={el?.id}
                  >
                    <span>{el?.code}</span>
                    <FaTicket />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="row">
              {cancel?.map((el) => {
                return (
                  <div
                    className="col-lg-3 col-md-6 col-sm-12 cancel"
                    key={el?.id}
                  >
                    <span>{el?.code}</span>
                    <FaTicket />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="user_orders">
          <h4 className="order_title">
            {t("order_title")}
            {order?.orders?.data?.map((el) => {
              return <UserOrder order={el} key={el?.id} />;
            })}
          </h4>
        </div>
      </div>
    </div>
  );
}
