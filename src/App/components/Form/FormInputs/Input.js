import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

/*
 input groups you can easily prepend and append text or buttons to the text-based inputs. For example, you can add the $ symbol, @ for a Twitter username, or anything else as required. 
 Form groups are used to wrap labels and form controls in a div 
 */

const Input = ({
  label = undefined,
  name = "password",
  defaultValue = "",
  control,
  error = {},
  type = "text",
  placeholder = "",
  formText = "",
  isDisabled = false
}) => {

  const errorMessage = error ? error[name]?.message : null;

  return (
    <>
      <Form.Group className="mb-3 " controlId={name}>
        {!!label && <Form.Label>{label}</Form.Label>}
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              onChange={onChange}
              value={value}
              ref={ref}
              type={type}
              isInvalid={!!errorMessage}
              placeholder={placeholder}
              disabled={isDisabled}
            />
          )}
        />
        {!!formText && <Form.Text className="text-muted">{formText}</Form.Text>}
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default Input;
