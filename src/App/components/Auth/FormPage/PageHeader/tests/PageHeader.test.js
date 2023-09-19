import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import PageHeader from "../PageHeader";


describe("<PageHeader />", () => {
  it("should show header message", () => {
    const props = {
      headerText: "Faça agora seu login!"
    };
    const wrapper = shallow(
        <PageHeader {...props} />
    );

    expect(wrapper.text()).toContain('Faça agora seu login!'); 
  });
});
