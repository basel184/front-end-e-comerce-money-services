"use client";
import { useDispatch } from "react-redux";
import { searchProduct } from "@/src/Redux/Reducers/ProductsSearch";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/utils/navigation";

export default function HomeSearch() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const formikObj = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      dispatch(searchProduct(values.search));
      router.push(`/store/product-search/${values.search}/`);
    },
  });
  return (
    <div className="home-search">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 ">
            <form action="" onSubmit={formikObj.handleSubmit}>
              <input
                type="search"
                className=" border border-start-0"
                placeholder={t("search_input_form")}
                name="search"
                value={formikObj.values.search}
                onChange={formikObj.handleChange}
              />
              <button
                className="inputSearch  border border-end-0 "
                type="submit"
              >
                {t("search_btn")}
              </button>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}
