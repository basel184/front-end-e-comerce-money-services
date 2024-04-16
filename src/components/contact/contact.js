// Contact.jsx
"use client";
import React, { useLayoutEffect, useState } from "react";
import { FaLocationDot, FaSquarePhone } from "react-icons/fa6";
import "@/src/Style/Contact.css";
import { useTranslations } from "next-intl";
import ContactForm from "./contactForm";

function Contact() {
  const t = useTranslations();
  const [info, setInfo] = useState({});

  useLayoutEffect(() => {
    fetch("https://moneyservices.store/back/public/api/contact-us")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data?.data);
      });
  }, []);

  return (
    <div className="contact">
      <div className="container">
        <div className="row py-3">
          <div className="col-lg-6 col-md-12">
            <div className="box mt-4">
              <div className="contact_title ">
                <h1 className="fw-bold">
                  {t("contact_title")}
                  {""}
                  <span style={{ color: "#222" }}>{t("contact_now")}</span>
                </h1>
              </div>
              <ContactForm />
              <div className="contact_info">
                <div className="address">
                  <FaLocationDot />
                  <h4>{info?.address}</h4>
                </div>
                <div className="tel">
                  <FaSquarePhone />
                  <h4>{info?.phone}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="box mt-4">
              <iframe
                title="Contact Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55263.40550978821!2d31.374225049999996!3d30.037923799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583c1380cba7ef%3A0xd541260e9e06978d!2z2YXYr9mK2YbYqSDZhti12LHYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1709473664903!5m2!1sar!2seg"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen // Corrected property
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
