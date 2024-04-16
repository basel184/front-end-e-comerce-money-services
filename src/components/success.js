"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

function Success() {
  const t = useTranslations();
  const [storedOrderId, setStoredOrderId] = useState(null);
  const [storedRefNum, setStoredRefNum] = useState(null);
  const [values, setStoredValues] = useState(null);

  useEffect(() => {
    // استرجاع البيانات من Local Storage
    if (typeof window !== "undefined") {
      const orderId = localStorage.getItem("order_id");
      const refNum = localStorage.getItem("ref_num");
      const values = localStorage.getItem("values");

      // تحديث حالة الصفحة بقيم البيانات المسترجعة
      setStoredOrderId(orderId);
      setStoredRefNum(refNum);
      setStoredValues(values);
      // قد ترغب في إزالة القيم من Local Storage إذا تم استخدامها
      // لتجنب الازدواجية أو الالتباس في المرات اللاحقة
      localStorage.removeItem("order_id");
      localStorage.removeItem("ref_num");
      localStorage.removeItem("values");
    }
  }, []); // [] يضمن تشغيل الأثر مرة واحدة عند تحميل الصفحة

  return (
    <div>
      <div className="main-container">
        <div className="check-container">
          <div className="check-background">
            <svg
              viewBox="0 0 65 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 25L27.3077 44L58.5 7"
                stroke="white"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="check-shadow"></div>
        </div>
        {/* عرض القيم المسترجعة */}
        <div>
          <p>Order ID: {storedOrderId}</p>
          <p>Ref Num: {storedRefNum}</p>
          <p>Values: {values}</p>
        </div>
      </div>
    </div>
  );
}

export default Success;
