"use client";

import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Loading() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    isClient && (
      <div
        style={{ height: "100vh" }}
        className="loading d-flex justify-content-center align-items-center"
      >
        <img
          src={"/assets/images/spinner.svg"}
          style={{ width: "100px" }}
          alt=""
        />
      </div>
    )
  );
}
