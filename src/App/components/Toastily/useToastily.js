import { useState } from "react";

export const useToastily = () => {
  const initialState = {
    error: false,
    success: false,
    message: null,
    title: null,
    variant: null,
    show: false
  };

  const [toast, setToast] = useState(initialState);

  const actions = {
    setError: (message) =>
      setToast({
        error: true,
        success: false,
        message: message,
        title: "Erro Interno",
        variant: "danger",
        fa: "exclamation",
        show: true,
        setToast
      }),
    setSuccess: (message) =>
      setToast({
        error: false,
        success: true,
        message: message,
        title: "Sucesso!",
        variant: "primary",
        fa: "check",
        show: true,
        setToast
      })
  };

  return { toast, actions };
};
