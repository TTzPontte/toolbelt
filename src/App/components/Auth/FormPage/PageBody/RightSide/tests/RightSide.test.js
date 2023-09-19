import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import RightSide from "../RightSide";
//import "@testing-library/jest-dom";

describe("<ConsentBox />", () => {
  it("should render the component", () => {
    const props = {
      title: "Já está cadastrado?",
      buttonText: "Entrar"
    };
    const wrapper = shallow(<RightSide {...props} />);
    expect(wrapper.find(".container-right-side")).toBeTruthy();
  });

  it("should render the component with default values", () => {
    render(<RightSide />);
    expect(screen.getByText("Já está cadastrado?")).toBeTruthy();
    expect(screen.getByText("Entrar")).toBeTruthy();
  });
});
