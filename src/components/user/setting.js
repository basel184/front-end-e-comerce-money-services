"use client";
import { useState } from "react";
import "@/src/Style/Setting.css";
import SettingSummry from "./SettingSummry";
import SettingPassword from "./SettingPassword";
import UserData from "./UserData";

export default function Setting() {
  const [tap, setTap] = useState(false);
  return (
    <div className="setting">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 mt-4">
            <SettingSummry setTap={setTap} tap={tap} />
          </div>
          <div className="col-lg-4 col-md-12 mt-4 forma">
            {tap === false ? <SettingPassword /> : <UserData />}
          </div>
        </div>
      </div>
    </div>
  );
}
