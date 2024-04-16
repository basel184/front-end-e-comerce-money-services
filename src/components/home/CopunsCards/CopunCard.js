"use client";
/* eslint-disable @next/next/no-img-element */
import { Line } from "rc-progress";
import Modal from "react-modal";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/utils/navigation";

function CopunCard({ cardData, sender }) {
  const currentTime = new Date();
  const locale = useLocale();

  const endDateTime = new Date(cardData?.end_date);

  //const endDateTime = new Date("2024-01-29 08:46:00");
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  function calculateRemainingTime() {
    const timeRemaining = Math.max(endDateTime - currentTime, 0);
    // console.log(timeRemaining);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    return { hours, minutes, seconds };
  }
  const couponsRef = useRef(null);

  useEffect(() => {
    const storedCoupons = localStorage.getItem("coupons");
    const coupons = storedCoupons ? JSON.parse(storedCoupons) : null;

    // Store the coupons in the ref
    couponsRef.current = coupons;
  }, []);
  // console.log("localCop", couponsRef?.current?.userID);

  useEffect(() => {
    if (cardData?.end_date) {
      const timerId = setInterval(() => {
        setRemainingTime(calculateRemainingTime());
      }, 1000);

      return () => clearInterval(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateRemainingTime]);

  // console.log(remainingTime);
  // Calculate the percentage of time remaining
  const timePercentage =
    ((remainingTime.hours * 3600 +
      remainingTime.minutes * 60 +
      remainingTime.seconds) /
      (24 * 3600)) *
    100;

  const t = useTranslations();
  const [isModalOpen, setModalOpen] = useState(false);

  ///const [hasEnoughCops, setHasEnoughCops] = useState(false);

  const [myCopuns, setMyCopuns] = useState(1);
  const [modalData, setModalData] = useState(null);

  const handleOpenModal = (cardData, timePercentage) => {
    setModalData({ ...cardData, timePercentage });
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const modalStyle = {
    content: {
      width: "600px",
      height: "650px",
      maxWidth: "80%",
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

  async function handleSubscription(compID, CopunstoJoin) {
    console.log("sub", compID, CopunstoJoin);
    try {
      const response = await axios.post(
        `https://moneyservices.store/back/public/api/update-copons?user_id=${couponsRef?.current?.userID}&product_id=${compID}&quantity=${CopunstoJoin}`
      );

      const modalContentElement = document.querySelector(".modal-content");
      if (modalContentElement) {
        modalContentElement.style.display = "none";
      }
      toast.success(response.data.message);
      handleCloseModal();
    } catch (error) {
      toast.error("Error subscribing:", error);
      console.error("Error subscribing:", error);
      // Handle error if needed
    }
  }

  return (
    <div
      className="container copun-card"
      style={{ backgroundColor: cardData?.end_date ? "#FFA81E" : "black" }}
    >
      {couponsRef?.current?.coupons > 0 ? (
        <Modal isOpen={isModalOpen} style={modalStyle}>
          <button
            style={{ display: "block" }}
            className="modal-btn-close"
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "30px" }} />
          </button>

          <div className="modal-content">
            <div className="w-75 ronded " style={{ width: "300px" }}>
              <img
                src={modalData?.photo}
                alt=""
                style={{
                  borderRadius: "20px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <p
              id="no-Cop"
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                margin: "22px 0",
              }}
            >
              {t("get_the_opp")} {modalData?.title}
            </p>
            <div className="counter-subs">
              <button
                style={{
                  color:
                    myCopuns === couponsRef?.current?.coupons
                      ? "gray"
                      : "white",
                }}
                disabled={myCopuns === couponsRef?.current?.coupons}
                onClick={() => {
                  setMyCopuns((prev) => {
                    if (prev < couponsRef?.current?.coupons) return prev + 1;
                    return prev;
                  });
                  // To the limit of his cops
                }}
              >
                +
              </button>
              <span>{myCopuns}</span>
              <button
                style={{
                  color: myCopuns <= 1 ? "gray" : "white",
                }}
                disabled={myCopuns <= 1}
                onClick={() => {
                  setMyCopuns((prev) => {
                    if (prev !== 1) return prev - 1;
                    return 1;
                  });
                }}
              >
                -
              </button>
            </div>
            {!modalData?.end_date ? (
              <span>
                {modalData?.stock}
                {t("head_sold")}
                {modalData?.total_stock}
              </span>
            ) : (
              <span>
                {t("close_TIME")}
                {locale === "en"
                  ? `${String(remainingTime.hours).padStart(2, "0")} : ${String(
                      remainingTime.minutes
                    ).padStart(2, "0")} : ${String(
                      remainingTime.seconds
                    ).padStart(2, "0")} `
                  : `${String(remainingTime.seconds).padStart(
                      2,
                      "0"
                    )} : ${String(remainingTime.minutes).padStart(
                      2,
                      "0"
                    )}  : ${String(remainingTime.hours).padStart(2, "0")} `}
              </span>
            )}

            <Line
              percent={
                !modalData?.end_date
                  ? (modalData?.stock / modalData?.total_stock) * 100
                  : modalData?.timePercentage
              }
              strokeWidth={6}
              trailWidth={10}
              strokeColor={"black"}
              className="w-50 rounded prog-line"
              strokeLinecap="round"
              style={{
                margin: "10px 0",
              }}
            />

            <button
              id="confirm-sub-btn"
              onClick={() => handleSubscription(modalData?.id, myCopuns)}
            >
              {t("confirm_subscription")}
            </button>
          </div>
        </Modal>
      ) : (
        <Modal isOpen={isModalOpen} style={modalStyle}>
          <button
            style={{ display: "block" }}
            className="modal-btn-close"
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "30px" }} />
          </button>

          <div className="modal-content">
            <img
              src="https://i.ibb.co/Xj6ykRB/Screenshot-2024-01-25-164826.png"
              alt=""
              style={{
                width: "300px",
              }}
            />
            <p id="sorry">{t("copun-sorry-msg")}</p>
            <p id="no-Cop">{t("copun-noCop-msg")}</p>
            <p className="modal-msg">{t("copun-msg-1")}</p>
          </div>
        </Modal>
      )}

      <div className="card-inside">
        <div className="inside-right">
          <img src={cardData?.photo} className="cop-image " alt="" />
        </div>
        <div className="inside-left">
          <h2 id="cardHead">{t("cardHead")}</h2>
          <h1 id="cardReward">{cardData?.title}</h1>
          <p id="cardPara">{t("inc_chance")}</p>
          {/*           <p id="card-price">{cardData?.price}LE</p>
           */}{" "}
          <div className="cop-links">
            {sender !== "contest" && (
              <Link
                href={`/contest-details/${cardData?.id}/${cardData.slug}`}
                id="det-link"
              >
                {t("compet_det")}
              </Link>
            )}

            <button
              style={{ outline: "0" }}
              id="cart-link"
              className="mx-2"
              onClick={() => handleOpenModal(cardData, timePercentage)}
            >
              {t("subsc_now")}
            </button>
          </div>
          <div
            id="card-time"
            style={{
              backgroundColor: cardData?.end_date ? "black" : "#FFA81E",

              right: locale === "en" ? "5px" : "",
              left: locale === "ar" ? "5px" : "",
            }}
          >
            <p id="time-head">
              {cardData?.end_date ? t("strt_now") : t("big_rwrd")}
            </p>
            {!cardData?.end_date ? (
              <span>
                {cardData?.stock}
                {t("head_sold")}
                {cardData?.total_stock}
              </span>
            ) : (
              <span>
                {t("close_TIME")}
                {locale === "en"
                  ? `${String(remainingTime.hours).padStart(2, "0")} : ${String(
                      remainingTime.minutes
                    ).padStart(2, "0")} : ${String(
                      remainingTime.seconds
                    ).padStart(2, "0")} `
                  : `${String(remainingTime.seconds).padStart(
                      2,
                      "0"
                    )} : ${String(remainingTime.minutes).padStart(
                      2,
                      "0"
                    )}  : ${String(remainingTime.hours).padStart(2, "0")} `}
              </span>
            )}
            <Line
              percent={
                !cardData?.end_date
                  ? (cardData?.stock / cardData?.total_stock) * 100
                  : timePercentage
              }
              strokeWidth={6}
              trailWidth={10}
              strokeColor={cardData?.end_date ? "#FFA81E" : "black"}
              className="w-50 rounded prog-line"
              strokeLinecap="round"
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CopunCard;
