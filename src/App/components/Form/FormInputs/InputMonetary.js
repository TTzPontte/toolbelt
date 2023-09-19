import React from "react";
import NumberFormat from "react-number-format";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

const InputMonetary = ({
  label = undefined,
  name = "",
  defaultValue = "",
  control
}) => {
  return (
    <>
      <Form.Group className="mb-3 " controlId={name}>
        {!!label && <Form.Label>{label}</Form.Label>}
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <NumberFormat
              className="inputGeneral"
              value={value}
              onValueChange={({ floatValue }) => onChange(floatValue)}
              prefix={"R$ "}
              thousandSeparator={"."}
              decimalSeparator={","}
              disabled={false}
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              ref={ref}
            />
          )}
        />
      </Form.Group>
    </>
  );
};
export default InputMonetary;
