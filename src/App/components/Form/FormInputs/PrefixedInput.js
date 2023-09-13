import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
const PrefixedInput = ({
  text,
  placeholder = "Username",
  id = "basic-addon1"
}) => (
  <InputGroup className="mb-3">
    <InputGroup.Text id={id}>@</InputGroup.Text>
    <FormControl
      placeholder={placeholder}
      aria-label={placeholder}
      aria-describedby={id}
    />
  </InputGroup>
);

export default PrefixedInput;
