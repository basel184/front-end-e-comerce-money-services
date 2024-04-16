"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useTranslations } from "next-intl";
export default function CustomSlider() {
  const language =
    window.localStorage.getItem("lng") === "ar" ? "arabic" : "english";

  const [winners, setWinners] = useState([]);
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(
          `https://moneyservices.store/back/public/api/home?locale=${language}` // Replace with your API endpoint
        );

        // Assuming the response data is an array of winners
        console.log("Error fetching winners:", response.data);
        setWinners(response.data.slider_draws);
      } catch (error) {
        console.error("Error fetching winners:", error);
        // Handle error if needed
      }
    };

    // Call the function to fetch winners when the component mounts
    fetchWinners();
  }, []);
  const t = useTranslations();
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      //   style={{backgroundColor: "rgb(255, 182, 30)"}}
      className="p-3 shadow"
    >
      {winners.map((el) => (
        <SwiperSlide key={el.id}>
          <div
            //className="row"
            className="d-flex justify-content-center align-items-center"
          >
            {/*           <div className="col-lg-6 col-md-6 col-sm-12">
             */}
            <Box
              className="col-lg-6 col-md-12 slide-x02"
              sx={{
                //  backgroundColor: { lg: "yellow" },
                maxWidth: { lg: "40%", xs: "40%" },
                display: "flex",
                justifyContent: { lg: "flex-start !important" },
              }}
            >
              <div className="box mt-4">
                <h4 className="fs-3">{t("custom_slider_head")}</h4>
                <p className="fs-3" style={{ color: "#ffb61e" }}>
                  {t("products_to_win")}
                </p>
              </div>
            </Box>
            <Box
              className="col-lg-6 col-md-12 slide-x03"
              sx={{
                maxWidth: { lg: "40%" },
                display: "flex",
                justifyContent: { lg: "flex-end !important" },
              }}
            >
              {/* <div className="col-lg-6 col-md-6 col-sm-12"> */}
              <div className="box mt-4">
                <img src={el.photo} style={{ width: "100px" }} alt="" />
              </div>
            </Box>
            {/* </div> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
