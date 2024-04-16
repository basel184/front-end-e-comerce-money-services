import "@/src/Style/Drawings.scss";
import { getLocale, getTranslations } from "next-intl/server";
import PopularCampaigns from "@/src/components/draws/PopularCampaigns";
import CopunsCardsContainer from "@/src/components/draws/CopunsCardsContainer";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("header_link_draws"),
    description: t("about_us4"),
  };
};

async function getData() {
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";
  console.log({ language, locale });
  const res = await fetch(
    `https://moneyservices.store/back/public/api/popular-competitions?locale=${language}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Drawings() {
  const data = await getData();
  return (
    <div className="Drawings-container">
      <PopularCampaigns comingFrom="Draws" data={data} />
      <CopunsCardsContainer />
    </div>
  );
}

export default Drawings;
