/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import { useTranslations } from "next-intl";
import "@/src/Style/swiperWinners.scss";

function SwiperWinnerCard({ cardData }) {
  const copunCode = cardData?.user_code.substring(6);
  const t = useTranslations();

  const announcedAt = cardData?.updated_at; //  "withdrawal_date": "2024-02-29 16:14:14",
  let formattedDate = "";
  if (announcedAt) {
    const datePart = announcedAt.split(" ")[0];
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
        <h3 className="congrats">{t("congrats")}</h3>
        <p id="card-winner">{cardData?.user_name}</p>
        {i18n.language === "english" ? (
          <p id="card-reward">
            {cardData?.title}
            {t("prize_winr")}
          </p>
        ) : (
          <p id="card-reward">
            {t("prize_winr")}
            {cardData?.title}
          </p>
        )}
        <p id="card-date">
          {t("cop-code")}
          <span id="card-date-span">{copunCode}</span>
        </p>
        <p id="ann-date">
          {t("ann-dte")}
          {formattedDate}
        </p>
      </div>
    </div>
  );
}

export default SwiperWinnerCard;
