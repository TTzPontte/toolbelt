import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import Select from "../FormInputs/Select";
import Input from "../FormInputs/Input";
import CheckboxInput from "../FormInputs/CheckboxInput";
/*
todo check prefixedInput they seem very alike
 */

const LargeTextInput = (
  name = "textInput",
  id = "basic-addon1",
  placeholder = "placeholder",
  label = "With textarea"
) => (
  <InputGroup className="mb-3">
    <InputGroup.Text id={id}>{label}</InputGroup.Text>

    <FormControl as="textarea" aria-label={label} />
  </InputGroup>
);
const CheckRadio = (options=[]) => (
  <>
    {options.map(
      (
        {
          inline = true,
          label = "2",
          name = "group1",
          type = "checkbox",
          disabled = false
        },
        index
      ) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            {...{
              inline,
              label,
              name,
              type,
              id: `inline-${type}-${index}`,
              disabled
            }}
          />
        </div>
      )
    )}
  </>
);
const RadioInput = ({ options }) => (
  <InputGroup>
    {options.map(({ label = "Radio button for following text input" }) => (
      <>
        <InputGroup.Radio aria-label={label} />
        <FormControl aria-label="Text input with radio button" />
      </>
    ))}
  </InputGroup>
);
const FormWizard = (props) => {
  return {
    readio: () => <RadioInput {...props} />,
    text: () => <LargeTextInput {...props} />,
    select: () => <Select {...props} />,
    input: () => <Input {...props} />,
    checkbox: () => <CheckboxInput {...props} />
  };
};

export default FormWizard;
