import "@/src/Style/Winners.css";
import "@/src/Style/contestDetails.css";
import SwiperWinners from "@/src/components/home/SwiperWinners/SwiperWinners";
import WinnerSlider from "@/src/components/winner/winnerSlider";
import LiveDrawsCard from "@/src/components/winner/LiveDrawsCard";
import { getLocale, getTranslations } from "next-intl/server";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("header_link_winners"),
    description: t("about_us4"),
  };
};

async function getLiveDraws() {
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";
  const res = await fetch(
    `https://moneyservices.store/back/public/api/live?locale=${language}`
  );

  return res.json();
}

export default async function Winners() {
  const t = await getTranslations();

  const liveDraws = await getLiveDraws();

  return (
    <div className="Winners-Container">
      <div className="container winners-container">
        <h4 className="winners_title">{t("winners_title")}</h4>
        <div className="py-4">
          <div className="container">
            <div className="row mt-6">
              {liveDraws?.Direct_lives.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-center align-items-center col-12 col-md-6 col-lg-4 col-xl-4 mb-4"
                >
                  <LiveDrawsCard cardData={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container swiper-prevDraws-container">
        <h4 className="swiper_prev_title"> {t("swiper_prevDraws_title")}</h4>
        <div className="py-4">
          <WinnerSlider prevDraws={liveDraws.Previous_lives} />
        </div>
      </div>

      <div
        style={{
          margin: "60px 0",
        }}
      >
        <SwiperWinners />
      </div>
    </div>
  );
}
