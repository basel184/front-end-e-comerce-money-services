import Success from "@/src/components/success";
import { getTranslations } from "next-intl/server";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("contact_title"),
    description: "Money Services Is Big Store",
  };
};

export default function page() {
  return <Success />;
}
