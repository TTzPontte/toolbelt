import { confirmSignup, resendCode } from "../helpers";

describe("Auth helpers functions", () => {
  describe("resend code confirmation", () => {
    it("should resend code and show a toastily with success message", async () => {
      const args = {
        auth: {
          resendCode: jest.fn()
        },
        email: "dev@pontte.com.br",
        toast: {
          setError: jest.fn(),
          setSuccess: jest.fn()
        }
      };

      await resendCode({ ...args });

      expect(args.auth.resendCode).toBeCalledTimes(1);
      expect(args.toast.setSuccess).toBeCalledTimes(1);
    });


    it("should resend code and failed then show a toastily with error message", async () => {
      const args = {
        auth: {
          resendCode: jest.fn().mockRejectedValue({ code: "FAILED "})
        },
        email: "dev@pontte.com.br",
        toast: {
          setError: jest.fn(),
          setSuccess: jest.fn()
        }
      };

      await resendCode({ ...args });

      expect(args.auth.resendCode).toBeCalledTimes(1);
      expect(args.toast.setError).toBeCalledTimes(1);
    });
  
  });

  
  describe("confirm signup function", () => {
    it("should confirm signup and show a toastily with success message", async () => {
      const args = {
        auth: {
          confirmSignup: jest.fn()
        },
        email: "dev@pontte.com.br",
        toast: {
          setError: jest.fn(),
          setSuccess: jest.fn()
        }
      };

      await confirmSignup({ ...args });

      expect(args.auth.confirmSignup).toBeCalledTimes(1);
      expect(args.toast.setSuccess).toBeCalledTimes(1);
    });


    it("should confirm signup and failed then show a toastily with error message", async () => {
      const args = {
        auth: {
          confirmSignup: jest.fn().mockRejectedValue({ code: "FAILED "})
        },
        email: "dev@pontte.com.br",
        toast: {
          setError: jest.fn(),
          setSuccess: jest.fn()
        }
      };

      await expect(() => confirmSignup({ ...args })).rejects.toThrow();

      expect(args.auth.confirmSignup).toBeCalledTimes(1);
      expect(args.toast.setError).toBeCalledTimes(1);
    });
  
  });
});
