/*
todo check prefixedInput they seem very alike
 */

import {FormControl, InputGroup} from "react-bootstrap";
import React from "react";

const LargeTextInput = () => (
    <InputGroup className="mb-3">
        <InputGroup.Text>With textarea</InputGroup.Text>
        <FormControl as="textarea" aria-label="With textarea" />
    </InputGroup>
);
export default LargeTextInput;