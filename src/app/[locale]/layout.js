import { Providers } from "@/src/Redux/provider";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/src/Style/Normalize.css";
import "@/src/Style/Main.scss";
import "@/src/Style/Global.scss";
import "@/src/Style/Home.css";
import "@/src/Style/products.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("header_link_home"),
    description: t("about_us4"),
  };
};

const myFont = localFont({ src: "../../Fonts/Tahoma_Font.ttf" });
export default function LocaleLayout({ children, params: { locale } }) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <html
          lang={locale === "ar" ? "ar" : "en"}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <body className={myFont.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </Providers>
    </NextIntlClientProvider>
  );
}
