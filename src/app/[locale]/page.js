import HomeSlide from "@/src/components/home/slider/HomeSlide";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";

import Sale from "@/src/components/home/sale/Sale";
import PopularCampaigns from "@/src/components/home/popular/PopularCampaigns";
import CopunsCardsContainer from "@/src/components/home/CopunsCards/CopunsCardsContainer";
import SwiperCardsContainer from "@/src/components/home/SwiperCards/SwiperCardsContainer";
import NewProducts from "@/src/components/home/newProduct/NewProducts";
import SwiperWinners from "@/src/components/home/SwiperWinners/SwiperWinners";
import ProductsBuys from "@/src/components/home/ProductsBuys/ProductsBuys";
import Services from "@/src/components/home/Services/Services";
import LatestProducts from "@/src/components/home/LatestProducts/LatestProducts";
import Posts from "@/src/components/home/posts/Posts";
import HomeSearch from "@/src/components/home/HomeSearch";

async function getData() {
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";
  console.log({ language, locale });
  const res = await fetch(
    `https://moneyservices.store/back/public/api/home?locale=${language}`
  );

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const t = await getTranslations();

  return (
    <main>
      <HomeSlide data={data.banners} sl={t("slider_link")} />

      <Sale data={data?.under_slider} />

      <PopularCampaigns />
      <CopunsCardsContainer />

      <SwiperCardsContainer />

      <div style={{ margin: "100px 0" }}>
        <NewProducts data={data?.Latest_additions} />
      </div>

      <SwiperWinners />

      <ProductsBuys
        dataInfo={data?.featured_products}
        cate={data?.categories}
      />

      <Services data={data?.icon} />

      <LatestProducts data={data?.new_products} />
      <Posts data={data?.posts} />
      <HomeSearch />
    </main>
  );
}
