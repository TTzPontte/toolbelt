import React, { useEffect } from "react";

const Pipefy = () => {
  // const handleOnLoad = (frame)=>{
  //     console.log({frame});
  //     const f = frame.target.value
  //     console.log({f})
  //         const ni = f.namedItem("customFields.partner_id")
  //     console.log({ni})
  // }

  const checkMessage = (message) => {
    console.log("------", message.type, "---------")
    console.log({message})
    if (message.data === "publicFormSubmitted") {
    }
  };

  useEffect(() => {
    const currentLocation = window.location.href;


    window.addEventListener("submit", checkMessage);
    window.addEventListener("auxclick", checkMessage);
    window.addEventListener("message", checkMessage);
    window.addEventListener("formdata", checkMessage);

    return () => {
      // window.removeEventListener("dblclick", checkMessage);
      // window.removeEventListener("auxclick", checkMessage);
      // window.removeEventListener("message", checkMessage);
    };
  }, []);
  return (
    <div>
      <iframe
        src="https://app.pipefy.com/public/form/LZksDSUr"
        name="FuckingForm"
        frameborder="0"
        sandbox={"allow-forms allow-scripts allow-same-origin "}
        // onLoad={v=>handleOnLoad(v)}
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
};

export default Pipefy;
