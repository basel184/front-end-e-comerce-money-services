/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import axios from "axios";
import "../Style/Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";
import { useLayoutEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "../utils/navigation";

export default function Footer() {
  const t = useTranslations();
  const [info, setInfo] = useState({});
  const [number, setInumber] = useState({});
  const locale = useLocale();

  const language =
    typeof window !== "undefined" && localStorage.getItem("lng") === "ar"
      ? "arabic"
      : "english";

  useLayoutEffect(() => {
    fetch("https://moneyservices.store/back/public/api/contact-us")
      .then((res) => res.json())
      .then((data) => {
        setInumber(data?.data);
      });
  }, []);
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://moneyservices.store/back/public/api/footer?locale=${language}`
        );
        setInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [language]);

  const isEnglish = locale === "en";

  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="box mt-4">
                <div style={{ display: "flex" }}>
                  <img
                    src={info?.logo}
                    alt="Logo"
                    style={{ width: "50px", margin: "0 15px" }}
                  />
                  <h4>{t("footer_logo")}</h4>
                </div>

                <div
                  style={{ margin: "10px 10px" }}
                  dangerouslySetInnerHTML={{
                    __html: info?.description1,
                  }}
                ></div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="box mt-4">
                <h4>{t("footer-cust-serv")}</h4>
                <div
                  style={{ margin: "10px -5px" }}
                  dangerouslySetInnerHTML={{
                    __html: info?.description2,
                  }}
                ></div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="box mt-4">
                <h4>{t("footer_link_two_head")}</h4>
                <div
                  style={{ margin: "0px 0px" }}
                  dangerouslySetInnerHTML={{
                    __html: info?.description3,
                  }}
                ></div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="box mt-4">
                <h4>{t("footer_info_head")}</h4>
                <div
                  style={{ margin: "0px 0px" }}
                  className="folowUS"
                  dangerouslySetInnerHTML={{
                    __html: info?.description4,
                  }}
                ></div>
                <div className="footer_links">
                  <a href={info?.facebook} target="_blank" className="facebook">
                    <FaFacebookF />
                  </a>
                  <a href={info?.twiter} target="_blank" className="twitter">
                    <FaTwitter />
                  </a>
                  <a href={info?.linkedin} target="_blank" className="linkedIn">
                    <FaLinkedin />
                  </a>
                  <a
                    href={info?.instagram}
                    target="_blank"
                    className="instgram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="box mt-4">
                <h4 className="fw-bold"> {t("footer_write_downlode")}</h4>

                <div
                  style={{ margin: "0px 0px" }}
                  dangerouslySetInnerHTML={{
                    __html: info?.description5,
                  }}
                ></div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <a
          href={`https://wa.me/2${number?.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              isEnglish
                ? "/assets/images/whatsapp.png"
                : "/assets//images/whatsapp-chat-ar.png"
            }
            alt="Whatsapp"
            style={{
              cursor: "pointer",
              position: "fixed",
              bottom: "50px",
              [isEnglish ? "left" : "right"]: "10px",
              width: "200px",
              zIndex: "9999",
            }}
          />
        </a>
      </div>

      <div className="copy">
        {t("footerEnd")}{" "}
        <a
          href="https://webarabi.com"
          rel="referrer"
          target="_blank"
          style={{ color: "white" }}
        >
          {t("webarbic")}
        </a>
      </div>
    </>
  );
}
