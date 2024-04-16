import "@/src/Style/popularCampigns.scss";
import { getLocale, getTranslations } from "next-intl/server";
import PopularCard from "./PopularCard";
import { Link } from "@/src/utils/navigation";

async function getData() {
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";
  const res = await fetch(
    `https://moneyservices.store/back/public/api/popular-competitions?locale=${language}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function PopularCampaigns({ comingFrom }) {
  const data = await getData();
  const t = await getTranslations();

  return (
    <div className="container campaigns-container">
      <h4 className="campaigns_title">{t("popular_campaigns")}</h4>
      <div className="py-4">
        <div className="container">
          <div className="row mt-6">
            {data?.products.map((item) => (
              <div
                key={`Populat_key__${item.id}`}
                className="d-flex justify-content-center align-items-center col-xl-4 col-lg-4 col col-md-6 col-sm-12 col-xs-12  mb-4"
              >
                <PopularCard cardData={item} />
              </div>
            ))}
          </div>

          {comingFrom !== "Draws" ? (
            <Link href={`/draws`} className="pop-btn">
              {t("product_buy_link")}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularCampaigns;
