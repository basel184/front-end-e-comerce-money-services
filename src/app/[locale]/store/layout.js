import { getTranslations } from "next-intl/server";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("header_link_shop"),
    description: t("about_us4"),
  };
};

function StoreLayout({ children }) {
  return children;
}

export default StoreLayout;
