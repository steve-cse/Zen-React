import React from "react";
import SecNavBar from "../../components/SecNavBar/SecNavBar";
import { MinimalFooter } from "../../containers";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import manual from "../../assets/manual.pdf"
import "./Instructions.css";
export default function Instructions() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="Instructions">
      <SecNavBar />
      <h2 className="instructions_heading">User Guide</h2>
      <div className="instructions_container">
        <div className="viewer_container">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={manual}></Viewer>
          </Worker>
        </div>
      </div>
      <MinimalFooter />
    </div>
  );
}
