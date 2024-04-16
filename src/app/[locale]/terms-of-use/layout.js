import { getLocale } from "next-intl/server";

async function getInfo() {
  try {
    const locale = await getLocale();
    const language = locale === "ar" ? "arabic" : "english";
    const res = await fetch(
      `https://moneyservices.store/back/public/api/page_api/6?locale=${language}`
    );

    return await res.json();
  } catch (e) {
    console.log(e);
  }
}

export const metadata = async () => {
  const info = await getInfo();
  return {
    title: info?.page?.title,
  };
};

async function PrivacyLayout({ children }) {
  return children;
}

export default PrivacyLayout;
