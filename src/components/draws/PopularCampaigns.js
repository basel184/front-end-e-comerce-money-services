import "@/src/Style/popularCampigns.scss";
import PopularCard from "./PopularCard";
import { Link } from "@/src/utils/navigation";
import { useTranslations } from "next-intl";

function PopularCampaigns({ comingFrom, data }) {
  const t = useTranslations();

  return (
    <div className="container campaigns-container">
      <h4 className="campaigns_title">{t("popular_campaigns")}</h4>
      <div className="py-4">
        <div className="container">
          <div className="row mt-6">
            {data?.products.map((item) => (
              <div
                key={`Producr_Draw__KKey_${item.id}`}
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
