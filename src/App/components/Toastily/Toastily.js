import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const Toastily = ({
  title,
  message,
  variant = "primary",
  fa = "circle",
  show = false,
  setToast
}) => {
  const [showToast, setShowToast] = useState(show);
  const toastWhiteTexts = ["danger", "dark", "success", "primary"];

  const handleSetShow = () =>
    setToast((state) => ({ ...state, show: !state.show }));

  useEffect(() => {
    setShowToast(show);
  }, [show]);

  return (
    <ToastContainer
      position={"top-end"}
      style={{
        zIndex: "5000"
      }}
    >
      <Toast
        show={showToast}
        className="d-inline-block m-1"
        bg={variant}
        onClose={() => handleSetShow()}
      >
        <Toast.Header>
          <i className={`fas fa-fw fa-${fa}`} />
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body
          className={
            toastWhiteTexts.find((toastText) => variant === toastText) &&
            "text-white"
          }
        >
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toastily;
