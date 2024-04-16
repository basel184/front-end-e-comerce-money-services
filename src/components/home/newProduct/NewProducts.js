/* eslint-disable @next/next/no-img-element */
import "@/src/Style/NewProducts.css";
import { Link } from "@/src/utils/navigation";
import { getTranslations } from "next-intl/server";

export default async function NewProducts({ data }) {
  const t = await getTranslations();
  return (
    <div className="new-product">
      <div className="container">
        <div className="row new-0x0">
          {data?.map((el) => {
            console.log(el);
            return (
              <>
                <div
                  className="col-lg-6 col-md-12 new-0x1"
                  key={`New_Product_key_${el.id}`}
                >
                  <div className="box mt-4">
                    <div className="info">
                      <h2 className="product_title" id="thefuckingdott">
                        {t("new_product_header")}
                      </h2>
                      <div className="product_info">
                        <h4>{el?.title}</h4>
                        <p>{el?.description}</p>
                        <Link className="product_link" href={`${el.link}`}>
                          {t("slider_link")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 new-0x2">
                  <div className="box mt-4">
                    <div className="img">
                      <div className="bg_img"></div>
                      <img src={el.photo} alt="" style={{ maxWidth: "50%" }} />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
