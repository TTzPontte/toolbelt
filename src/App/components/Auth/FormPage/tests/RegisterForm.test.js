import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../..";
import RegisterForm from "../RegisterForm";
import * as dataStore from "../../../../helpers/dataStore";

const WrapperProvider = ({ children, value }) => (
  <AuthContext.Provider {...{ value }}>
    <MemoryRouter initialEntries={["/register"]}>{children}</MemoryRouter>
  </AuthContext.Provider>
);

describe("<RegisterForm />", () => {
  it("must change the form from step 1 of invitation to step2 of registration", async () => {
    jest
      .spyOn(dataStore, "subscribeToModel")
      .mockImplementation(({ callback }) => {
        callback([{ email: "dev@pontte.com.br" }]);
      });

    const props = {
      invite: {
        guestId: "9a7b504d-8c80-4b36-9439-4b3540a08728"
      }
    };

    await act(
      () =>
        new Promise((resolve) =>
          resolve(
            render(
              <WrapperProvider value={{ user: {} }}>
                <RegisterForm {...props} />
              </WrapperProvider>
            )
          )
        )
    );

    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CPF")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/confirm password/i)
    ).toBeInTheDocument();
  });

});
