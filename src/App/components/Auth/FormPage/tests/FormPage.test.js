import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import FormPage from "../FormPage";


describe("<FormPage />", () => {
  it("should render component", () => {
    const props = {
      headerText: "Faça agora seu login!"
    };
    const wrapper = shallow(
        <FormPage {...props} />
    );

    expect(wrapper.text()).toContain('<PageHeader />')
    expect(wrapper.text()).toContain('<PageBody />') 
  });

  it("should render component without props", () => {
    const wrapper = shallow(
        <FormPage />
    );

    expect(wrapper.text()).toContain('<PageHeader />')
    expect(wrapper.text()).toContain('<PageBody />') 
  });
});
