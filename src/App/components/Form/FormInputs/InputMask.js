import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Input from "react-input-mask";

/*
 input groups you can easily prepend and append text or buttons to the text-based inputs. For example, you can add the $ symbol, @ for a Twitter username, or anything else as required. 
 Form groups are used to wrap labels and form controls in a div 
 */

const InputMask = ({
  label = undefined,
  name = "password",
  defaultValue = "",
  control,
  error = {},
  type = "text",
  placeholder = "",
  formText = "",
  isDisabled = false,
  className = "",
  mask = null
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name={name}
              className={`inputGeneral ${className}`}
              onChange={onChange}
              mask={mask}
              value={value}
              placeholder={placeholder}
              type={type}
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

export default InputMask;
