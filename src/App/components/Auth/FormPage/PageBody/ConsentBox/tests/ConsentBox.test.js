import { shallow } from "enzyme";
import ConsentBox from "../ConsentBox";
//import "@testing-library/jest-dom";

describe("<ConsentBox />", () => {
  it("should render the component", () => {
    const wrapper = shallow(<ConsentBox />);
    expect(wrapper.find(".consent-box")).toBeTruthy();
  });
});
