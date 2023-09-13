import {FormControl, InputGroup} from "react-bootstrap";
import React from "react";

const RadioInput = ({}) => (
    <InputGroup>
        <InputGroup.Radio aria-label="Radio button for following text input" />
        <FormControl aria-label="Text input with radio button" />
    </InputGroup>
);
export default RadioInput;