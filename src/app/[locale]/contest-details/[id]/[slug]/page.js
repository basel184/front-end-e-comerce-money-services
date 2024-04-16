/* eslint-disable @next/next/no-img-element */
import "@/src/Style/contestDetails.css";
import { Box } from "@mui/material";
import HomeSlide from "@/src/components/home/slider/HomeSlide";
import DetailsSwiper from "@/src/components/ContestDetails/DetailsSwiper";
import { getLocale, getTranslations } from "next-intl/server";
import Shear from "@/src/components/ContestDetails/shear";
import CopunsCardsContainer from "@/src/components/draws/CopunsCardsContainer";
import CopunCard from "@/src/components/home/CopunsCards/CopunCard";

export const metadata = async () => {
  return {
    title: "Contest Details",
    description: "Money Services Is Big Store",
  };
};

// data
async function fetchPopularCompetitions(slug) {
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";
  console.log({ data: locale });
  const res = await fetch(
    `https://moneyservices.store/back/public/api/competitions-detail/${slug}?locale=${language}`
  );

  return res.json();
}
// banData
async function fetchbanData() {
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";

  const res = await fetch(
    `https://moneyservices.store/back/public/api/home?locale=${language}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
// winners
async function fetchWinners() {
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";

  const res = await fetch(
    `https://moneyservices.store/back/public/api/home?locale=${language}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function ContestDetails({ params: { slug } }) {
  const t = await getTranslations();
  const data = await fetchPopularCompetitions(slug);
  const bandata = await fetchbanData();
  const winners = await fetchWinners();

  return (
    <div>
      <HomeSlide data={bandata.banners} sl={t("slider_link")} />
      <div className="card-container contest-container mt-5">
        <CopunCard cardData={data.product_detail} sender={"contest"} />
      </div>

      <div className="container bottom-container d-flex flex-column flex-md-row ">
        <Box
          sx={{
            width: { sm: "100% !important", md: "70% !important" },
            marginBottom: { xs: "40px", md: "0px" },
          }}
          className="Right "
        >
          <h6>{t("single_product_taps_information")}</h6>
          <p className="desc">{data?.product_detail.description}</p>
        </Box>
        <Box
          sx={{ width: { sm: "100% !important", md: "20% !important" } }}
          className="Left"
        >
          <div className="top">
            <h4>{t("custom_slider_head")}</h4>
            <h6>{t("products_to_win")}</h6>
          </div>
          <DetailsSwiper winners={winners.slider_draws} />
        </Box>
      </div>
      <div
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          width: { sm: "70%", md: "60%", lg: "50%", xl: "35%" },
        }}
        className="share-btns"
      >
        <Shear
          data={data}
          tf={t("single_product_facebook_share")}
          tt={t("single_product_twitter_share")}
        />
      </div>
    </div>
  );
}

export default ContestDetails;
