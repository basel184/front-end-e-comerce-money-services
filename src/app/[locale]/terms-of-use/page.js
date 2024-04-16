"use client";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
export default function HowToUse() {
  const [info, setInfo] = useState({});
  const locale = useLocale();
  const language = locale === "ar" ? "arabic" : "english";
  useEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/page_api/6?locale=${language}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfo(data?.page);
      });
  }, []);
  return (
    <div className="global_pages">
      <div className="container">
        <div className="img">
          <h1>{info?.title}</h1>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: info?.description,
          }}
        ></p>
      </div>
    </div>
  );
}
