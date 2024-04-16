"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export default function Privacy() {
  const locale = useLocale();
  const language = locale === "ar" ? "arabic" : "english";

  const [info, setInfo] = useState();
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://moneyservices.store/back/public/api/page_api/3?locale=${language}`
      );
      setInfo(await res.json());
    })();
  });
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
