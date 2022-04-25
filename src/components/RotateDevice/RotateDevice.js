import React from "react";
import "./RotateDevice.css";
import rotate from "../../assets/rotate.png";
import SecNavBar from "../SecNavBar/SecNavBar";
import { MinimalFooter } from "../../containers";

export default function RotateDevice() {
  return (
    <div className="RotateDevice">
      <SecNavBar />
      <div className="roatate_device_img_container">
        <center>
          <img src={rotate} alt="" />
          <p>Please rotate your device and <solid onClick={() => {window.location.reload(false);}}>refresh</solid></p>
        </center>
      </div>
      <MinimalFooter />
    </div>
  );
}
