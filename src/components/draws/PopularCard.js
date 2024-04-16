"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "@/src/Style/popular_card.scss";
import { Line } from "rc-progress";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/utils/navigation";

function PopularCard({ cardData }) {
  //  console.log(cardData);
  const t = useTranslations();

  const locale = useLocale();

  const currentTime = new Date();

  const endDateTime = new Date(cardData?.end_date);

  //const endDateTime = new Date("2024-01-29 08:46:00");
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
  function calculateRemainingTime() {
    const timeRemaining = Math.max(endDateTime - currentTime, 0);
    console.log(timeRemaining);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    return { hours, minutes, seconds };
  }

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

  return (
    <Link href={`/contest-details/${cardData?.id}/${cardData.slug}`}>
      <div className="pop-card-container">
        <div className="cardTop">
          <img className="cardImg" alt="" src={cardData?.photo} />
        </div>
        <div className="cardBottom">
          <p id="win-opo">{t("get_the_opp")}</p>
          <p id="card-title">{cardData?.title}</p>

          {!cardData?.end_date && (
            <>
              <p id="card-prog">
                {cardData?.stock} {t("prog_rest_stock")}
                {cardData?.total_stock}
              </p>
              <Line
                percent={(cardData?.stock / cardData?.total_stock) * 100}
                strokeWidth={6}
                trailWidth={10}
                strokeColor={"#ffb61e"}
                className="w-50 rounded prog-line"
                strokeLinecap="round"
              />
            </>
          )}
          {cardData?.end_date && (
            <>
              <p id="card-prog">
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
              </p>
              <Line
                percent={timePercentage}
                strokeWidth={6}
                trailWidth={10}
                strokeColor={"#ffb61e"}
                className="w-50 rounded prog-line"
                strokeLinecap="round"
              />
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PopularCard;
