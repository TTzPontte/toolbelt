import { shallow } from "enzyme";
import LeftSide from "../LeftSide";
//import "@testing-library/jest-dom";

describe("<ConsentBox />", () => {
  it("should render the component", () => {
    const wrapper = shallow(<LeftSide />);
    expect(wrapper.text()).toContain("<RegisterForm />");
    expect(wrapper.text()).toContain("<ConsentBox />");
  });
});
