// import axios from "axios";
// import { Formik, useFormik } from "formik";
// import { jwtDecode } from "jwt-decode";
// import { useTranslation } from "react-i18next";
// const user = JSON?.parse(localStorage?.getItem("user"));
// import { ToastContainer, toast } from "react-toastify";

// export default function UserData() {
//   const { t } = useTranslation();
//   const formkiObj = useFormik({
//     initialValues: {
//       name: "",
//       image: "",
//     },
//     onSubmit: async (values) => {
//       const { name, image } = values;
//       const data = new FormData();
//       data.append("name", name);
//       data.append("image", image);
//       // const res = await axios({
//       //     method: "post",
//       //     url: `https://moneyservices.store/back/public/api/profile/${user.id}`,
//       //     data: data,
//       //     headers: {
//       //         "Content-Type": "multipart/imaform-data"
//       //     }
//       // })
//       axios
//         .post(
//           `https://moneyservices.store/back/public/api/profile/${
//             user?.user?.id ? user?.user?.id : user?.id
//           }`,
//           data,
//           {
//             header: {
//               "Content-Type": "multipart/data",
//               Authorization: `Bearer ${JSON.parse(
//                 localStorage.getItem("token")
//               )}`,
//             },
//           }
//         )
//         .then((res) => {
//           if (res.status === 201) {
//             toast.success(res?.data?.message);
//           } else {
//           }
//         })
//         .catch((err) => toast.error(err?.message));

//       fetch(
//         "https://moneyservices.store/back/public/api/profile-user?user_id=115"
//       )
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {});
//     },
//   });
//   // console.log(data.profile.photo)
//   return (
//     <form action="" onSubmit={formkiObj.handleSubmit}>
//       <div className="input_group">
//         <label htmlFor="name">{t("setting_form_name")}</label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           onChange={formkiObj.handleChange}
//           value={formkiObj.values.name}
//         />
//       </div>
//       <div className="input_group">
//         <label htmlFor="image">{t("setting_form_img")}</label>
//         <input
//           type="file"
//           name="image"
//           id="image"
//           onChange={formkiObj.handleChange}
//           value={formkiObj.values.image}
//         />
//       </div>
//       <button type="submit">{t("setting_form_btn")}</button>
//       <ToastContainer />
//     </form>
//   );
// }

import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "next-intl";

const UserData = () => {
  const t = useTranslations();
  const user = JSON?.parse(localStorage?.getItem("user"));

  const formikObj = useFormik({
    initialValues: {
      name: "",
      image: null, // تغيير هذا إلى null بدلاً من السلسلة الفارغة
    },
    onSubmit: async (values) => {
      const { name, image } = values;
      const data = new FormData();
      data.append("name", name);
      data.append("image", image);

      try {
        const res = await axios.post(
          `https://moneyservices.store/back/public/api/profile/${
            user?.user?.id ? user?.user?.id : user?.id
          }`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );

        console.log(res);
        if (res.status === 201) {
          toast.success(res?.data?.message);
        } else {
          console.error(res.message);
        }
      } catch (err) {
        toast.error(err?.message);
      }

      console.log(image?.name); // افترضت أن هذا هو الطريقة الصحيحة للوصول إلى اسم الملف
      console.log(user);

      try {
        const response = await fetch(
          "https://moneyservices.store/back/public/api/profile-user?user_id=115"
        );
        const data = await response.json();
        console.log(data.profile.photo);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form action="" onSubmit={formikObj.handleSubmit}>
      <div className="input_group">
        <label htmlFor="name">{t("setting_form_name")}</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={formikObj.handleChange}
          value={formikObj.values.name}
        />
      </div>
      <div className="input_group">
        <label htmlFor="image">{t("setting_form_img")}</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(event) => {
            formikObj.setFieldValue("image", event.currentTarget.files[0]);
          }}
        />
      </div>
      <button type="submit">{t("setting_form_btn")}</button>
      <ToastContainer />
    </form>
  );
};

export default UserData;
