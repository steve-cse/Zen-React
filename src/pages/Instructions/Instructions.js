import React, { useRef, useEffect } from "react";
import SecNavBar from "../../components/SecNavBar/SecNavBar";
import { MinimalFooter } from "../../containers";
import CloudPdfViewer from "@openbook/cloudpdf-viewer";
import "./Instructions.css";
export default function Instructions() {
  const viewer = useRef(null);
  useEffect(() => {
    CloudPdfViewer(
      {
        documentId: "73bf6f9a-e988-426a-8fea-6601b81cb299",
        darkMode: false,
      },
      viewer.current
    );
  }, []);
  return (
    <div className="Instructions">
      <SecNavBar />
      <h2 className="instructions_heading">User Guide</h2>
      <div className="instructions_container">
        <div className="viewer" ref={viewer}></div>
      </div>
      <MinimalFooter />
    </div>
  );
}
