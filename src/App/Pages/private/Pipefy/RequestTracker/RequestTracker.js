import React from "react";

const RequestTracker = () => {
  // const url = "https://app.pipefy.com/request-tracker/"
  const url = "https://app.pipefy.com/public/form/LZksDSUr?embedded=true";
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

export default RequestTracker;
