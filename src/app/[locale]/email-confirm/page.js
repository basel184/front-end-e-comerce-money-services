import EmailConfirm from "@/src/components/auth/email-confirm";
import { getTranslations } from "next-intl/server";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("email_confirm"),
    description: "Money Services Is Big Store",
  };
};

export default function ConformEmail() {
  return <EmailConfirm />;
}
