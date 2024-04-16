/* eslint-disable @next/next/no-img-element */
"use client";
import "@/src/Style/about.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function AboutUs() {
  const [info, setInfo] = useState({});
  const [use, setUse] = useState({});
  const locale = useLocale();
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const t = useTranslations();
  const language = locale === "ar" ? "arabic" : "english";

  const fetchData = async (url, setData, setLoader) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 20)); // تأخير لمدة 1 ثانية (يمكنك تعديلها)
      const response = await axios.get(url);
      setData(response.data);
      setLoader(true);
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData(
      `https://moneyservices.store/back/public/api/about_api/5?locale=${language}`,
      setInfo,
      setLoader1
    );
    fetchData(
      `https://moneyservices.store/back/public/api/page_api/6?locale=${language}`,
      setUse,
      setLoader2
    );
  }, [language]);

  return (
    <>
      {loader1 && loader2 && (
        <>
          <div className="container my-5">
            <div className="row">
              <div className="col-md-8 ">
                <div className="my-5">
                  <h1 className="fw-bolder my-4">
                    <span className="text-warning ">
                      {info?.page?.title?.split(" ")[0]}
                    </span>{" "}
                    <span>{info?.page?.title?.split(" ")[1]}</span>{" "}
                  </h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: info?.page?.description,
                    }}
                    className="lh-md"
                  ></p>
                </div>
              </div>
              <div className="col-md-4">
                <img src={info?.page?.photo[0]} className="w-75" alt=""></img>
              </div>
            </div>
          </div>

          <div className="container  bg-warning p-5 position-relative ">
            <h2 className="fw-bolder text-center ">{t("about_goal_title")}</h2>
            <div className="row align-item-center justify-content-center ">
              {info?.Our_goals?.map((el) => (
                <div className="col-md-3" key={el.id}>
                  <div className="card border border-dark rounded ro2 ">
                    <img
                      src={el?.photo}
                      style={{ padding: "30px" }}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <p
                        className="card-text text-center"
                        dangerouslySetInnerHTML={{
                          __html: el?.description,
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-5">
            <div className="container my-5 pt-5 ">
              <div className="row pt-5 ">
                <div className="col-md-12">
                  <h4 className="fw-bolder my-4">
                    <span className="text-warning ">
                      {use?.page?.title?.split(" ")[0]}
                    </span>{" "}
                    <span>
                      {use?.page.title?.split(" ").length === 2
                        ? use?.page?.title?.split(" ")[1]
                        : use?.page?.title?.split(" ")[1] +
                          " " +
                          use?.page?.title?.split(" ")[2]}
                    </span>
                  </h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: use?.page?.description,
                    }}
                    className="w-100"
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
}
