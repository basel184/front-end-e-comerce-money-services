"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { React, useLayoutEffect, useState, useEffect, useContext } from "react";
import "@/src/Style/sliderBar.css";
import {
  faCamera,
  faUser,
  faHeart,
  faChevronLeft,
  faTicket,
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useTranslations } from "next-intl";
import { tokenContext } from "../../app/Context/tokenContext";
import { Link, useRouter } from "../../utils/navigation";

export default function SideBarUser() {
  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState({});
  const t = useTranslations();
  const [userCops, setUserCops] = useState();
  const router = useRouter();
  const [isFetchUserCopunsCompleted, setIsFetchUserCopunsCompleted] =
    useState(false);
  let { token, setToken } = useContext(tokenContext);
  const logOut = async () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push(`/`);
    localStorage.removeItem("user");
  };
  const fetchUserCopuns = async () => {
    try {
      const response = await axios.get(
        `https://moneyservices.store/back/public/api/profile-user?user_id=${
          user?.id || user?.user?.id
        }`
      );

      setUserCops(response.data.my_copon);
      setIsFetchUserCopunsCompleted(true);
    } catch (error) {
      console.error("Error fetching user copuns:", error);
      setIsFetchUserCopunsCompleted(true);
    }
  };

  useEffect(() => {
    if (!isFetchUserCopunsCompleted) {
      fetchUserCopuns();
    }
  }, [isFetchUserCopunsCompleted]);

  useLayoutEffect(() => {
    if (!userInfo.id) {
      fetch(
        `https://moneyservices.store/back/public/api/profile-user?user_id=${
          user?.user?.id ? user?.user?.id : user?.id
        }`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => setUserInfo(data?.profile));
    }
  }, [userInfo, user]);
  return (
    <>
      <div className="col-md-3 bg-light mt-4  h-50 rounded-3">
        <div class="position-relative mb-5 mt-5 text-center">
          <div
            style={{ cursor: "pointer" }}
            className="circle-photo position-absolute bg-warning rounded-circle p-3"
            onClick={() => router.push(`/account`)}
          >
            <FontAwesomeIcon className="text-white" icon={faCamera} />
          </div>

          {userInfo?.photo ? (
            <img
              src={userInfo?.photo}
              className="imgProfile border   position-relative "
              alt={userInfo?.name}
            />
          ) : (
            <img
              className="w-50"
              style={{ "border-radius": "60px" }}
              src={"/assets/images/profile_img.webp"}
              alt=""
            />
          )}
        </div>

        <h4 className="text-center">{userInfo?.name}</h4>
        <h6 className="text-center">{userInfo?.email}</h6>
        <div
          class="bg-warning text-white mb-5  text-center  rounded-pill"
          style={{
            display: "flex",
            "justify-content": "space-between",
          }}
        >
          <span
            style={{
              padding: "1px 8px",
            }}
          >
            {t("numberOfCopones")}
          </span>
          <span
            style={{
              color: "#000",
              padding: "1px 8px",
              background: "#fff",
              "border-radius": "17px",
            }}
          >
            {userCops}
          </span>
        </div>

        <div className="content-user border-bottom text-center d-flex justify-content-around">
          <Link href={`/account`}>
            <div className="con  d-flex justify-content-between ">
              <FontAwesomeIcon icon={faUser} className="ps-2 " />
              <p>{t("Account")}</p>
            </div>{" "}
          </Link>
          <FontAwesomeIcon className="mt-2 " icon={faChevronLeft} />
        </div>
        <div className="content-user border-bottom d-flex justify-content-around">
          <Link href={`/wish-list`}>
            {" "}
            <div className="con  d-flex justify-content-around ">
              <FontAwesomeIcon icon={faHeart} className="ps-2 mt-2" />
              <p className="p-1">{t("Favourite")}</p>
            </div>{" "}
          </Link>
          <FontAwesomeIcon className="mt-2 " icon={faChevronLeft} />
        </div>

        <div className="content-user border-bottom d-flex justify-content-around">
          <Link href={`/copouns`}>
            <div className="con cubanclick  d-flex justify-content-around ">
              <FontAwesomeIcon icon={faTicket} className="ps-2 mt-2" />
              <p className="p-1">{t("Cubans")} </p>
            </div>
          </Link>
          <FontAwesomeIcon className="mt-2 " icon={faChevronLeft} />
        </div>
        <div className="content-user border-bottom d-flex justify-content-around">
          <Link href={`/orders`}>
            <div className="con  d-flex justify-content-around ">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="ps-2 mt-2" />
              <p className="p-1 fs-6">{t("header_user_orders")}</p>
            </div>{" "}
          </Link>
          <FontAwesomeIcon className="mt-2" icon={faChevronLeft} />
        </div>
        <h6 className="p-4" onClick={() => logOut()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> {t("LogOut")}
        </h6>
      </div>
    </>
  );
}
