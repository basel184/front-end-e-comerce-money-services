/* eslint-disable @next/next/no-img-element */
"use client";
import { useTranslations } from "next-intl";
import "@/src/Style/swiperContainer.scss";

function SwiperCard({ cardData }) {
  const t = useTranslations();
  const withdrawalDate = cardData?.withdrawal_date; //  "withdrawal_date": "2024-02-29 16:14:14",

  let formattedDate = "";
  if (withdrawalDate) {
    const datePart = withdrawalDate.split(" ")[0];
    formattedDate = new Date(datePart).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    console.log(formattedDate); // Output: "29/02/2024"
  }

  return (
    <div className="swip-card-container">
      <div className="cardTop">
        <img className="cardImg" alt="" src={cardData?.photo} />
      </div>
      <div className="cardBottom">
        <p id="card-title">{cardData?.title}</p>
        <p id="card-date">
          <span id="with-dte">{t("withdrw_dte")}</span>
          <span id="card-date-span">{formattedDate}</span>
        </p>
      </div>
    </div>
  );
}

export default SwiperCard;
