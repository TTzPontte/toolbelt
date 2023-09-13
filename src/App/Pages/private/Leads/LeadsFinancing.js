import React from "react";

const LeadsFinancing = () => {
  const url = "https://app.pipefy.com/public/form/rDv0mKk0";
  return (
    <>
      <iframe
        style={{ width: " 100%", height: "100vh" }}
        src={url}
        frameborder="0"
        onLoad={()=>document
          .querySelector("iframe")
          .contentWindow.window.document.querySelector("Tag you wanna select")}
      />
    </>
  );
};

export default LeadsFinancing;
