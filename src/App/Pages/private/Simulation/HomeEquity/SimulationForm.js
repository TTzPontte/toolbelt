import React, { Children } from "react";
import { Controller, useForm } from "react-hook-form";
import { DAY_OPTIONS, GRACE_PERIOD_OPTIONS, MONTH_OPTION } from "./constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import Input from "../../../../components/Form/FormInputs/Input";
import Select from "../../../../components/Form/FormInputs/Select";
import { saveSimulation } from "./redux-flow/service";
import InputMonetary from "../../../../components/Form/FormInputs/InputMonetary";

const SubmitBtn = ({ control, text = "Save" }) => (
  <>
    <Controller
      control={control}
      render={({ field: { ref }, formState }) => (
        <Button
          type="submit"
          style={{ color: "white" }}
          disabled={formState.isSubmitting}
          className="btn btn-primary"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1" />
          )}
          {text}
        </Button>
      )}
    />
  </>
);

const InputRow2x = ({ children }) => {
  const [input1, input2] = Children.toArray(children);

  return (
    <Row>
      <Col>{input1}</Col>
      <Col>{input2}</Col>
    </Row>
  );
};
const SimulationForm = ({ setState, setStep2 }) => {
  const loanDate = new Date().toISOString().slice(0, 10);

  const defaultValues = {
    amortizationSchedule: "",
    dueDay: "1",
    contractType: "",
    gracePeriod: "",
    skipMonth: ""
  };

  const {
    handleSubmit,
    control,
    setValue,
    errors: formErrors
  } = useForm({
    defaultValues
  });

  const triggerCalculator = (data) => saveSimulation(data, setState);

  const handleTriggerCalculatorFlow = async (data) => {
    await triggerCalculator(data);
    await setStep2(true);
  };
  return (
    <Row justify="center" style={{ justifyContent: "center" }}>
      <Col className="pp-new-public-form-fields ">
        <Form
          id="NewContractForm"
          className="mousetrap"
          onSubmit={handleSubmit(handleTriggerCalculatorFlow)}
        >
          <div className="pp-new-public-form-wrapper">
            <InputRow2x>
              <InputMonetary
                control={control}
                name="loanValue"
                label="Valor do empréstimo *:"
              />
              <Input
                control={control}
                name="terms"
                label="Número de parcelas *:"
              />
            </InputRow2x>
            <InputRow2x>
              <InputMonetary
                control={control}
                name="monthlyIncome"
                label="Renda mensal *: "
              />
              <InputMonetary
                control={control}
                name="propertyValue"
                label="Valor do imóvel *:"
              />
            </InputRow2x>
            <InputRow2x>
              <Select
                options={GRACE_PERIOD_OPTIONS}
                control={control}
                setValue={setValue}
                name="gracePeriod"
                label="Carência *:"
              />
              <Select
                // clsx={"none"}
                options={MONTH_OPTION}
                control={control}
                name="skipMonth"
                label="Mês do ano sem pagar *:"
                type={"select"}
              />
            </InputRow2x>
            <InputRow2x>
              <Input
                options={DAY_OPTIONS}
                control={control}
                name="dueDay"
                label="Dia do pagamento *:"
                type={"select"}
              />
              <Input
                control={control}
                setValue={setValue}
                name="interestRate"
                label="Taxa *:"
                defaultValue="0.79"
                isDisabled={true}
              />
            </InputRow2x>

            <Row style={{ justifyContent: "center" }}>
              <Col>
                <Row style={{ justifyContent: "center" }}>
                  <div style={{ margin: "0 auto", width: "auto" }}>
                    <SubmitBtn control={control} text=" Calcular fluxo " />
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SimulationForm;
