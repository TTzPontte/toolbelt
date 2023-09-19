const resendCode = async ({ auth, email, toast }) => {
  try {
    await auth.resendCode(email);
    toast.setSuccess("Código de verificação enviado com sucesso!");
  } catch (err) {
    console.log("An error occurred while trying to send code:", err);
    toast.setError(
      "Erro ao enviar o código de verificação.  Tente novamente mais tarde!",
      err.code
    );
  }
};

const confirmSignup = async ({ auth, code, email, toast, userInviteId }) => {
  try {
    await auth.confirmSignup({ email, code, userInviteId });
    toast.setSuccess("Conta confirmada com sucesso!");
  } catch (err) {
    switch (err.code) {
      case "CodeMismatchException":
        toast.setError("Código de confirmação inválido.", "Código Inválido");
        break;
      case "ExpiredCodeException":
        toast.setError("Código de confirmação expirado.", "Código Expirado");
        break;
      default:
        toast.setError(
          "Erro na confirmação do código. Tente novamente mais tarde!",
          err.code
        );
        break;
    }

    console.log(
      "An error occurred while trying to confirm the account:",
      err.stack
    );

    throw new Error("INVALID_CONFIRMATION_CODE");
  }
};

export { resendCode, confirmSignup };
