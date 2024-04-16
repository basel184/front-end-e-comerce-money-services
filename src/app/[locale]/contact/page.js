import Contact from "@/src/components/contact/contact";
import { getTranslations } from "next-intl/server";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("contact_title"),
    description: t("about_us4"),
  };
};

export default function page() {
  return <Contact />;
}
