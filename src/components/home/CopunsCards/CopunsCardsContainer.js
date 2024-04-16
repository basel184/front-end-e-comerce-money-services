import CopunCard from "./CopunCard";
import "@/src/Style/copun-container.scss";
import { getLocale } from "next-intl/server";

async function getData() {
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";
  const res = await fetch(
    `https://moneyservices.store/back/public/api/competitions?locale=${language}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function CopunsCardsContainer() {
  const data = await getData();

  return (
    <div className="card-container">
      {data?.products.map((item) => (
        <div key={`product_${item.id}`}>
          <CopunCard cardData={item} />
        </div>
      ))}
    </div>
  );
}

export default CopunsCardsContainer;
