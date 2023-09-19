import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

const renderRadio = (label, value, field) => (
    <Form.Check type="radio" label={label} value={value} {...field} inline />
);

const SerasaReportForm = ({ onSubmit }) => {
    const { handleSubmit, control, register } = useForm();

    const entityTypes = [
        { label: "PJ", value: "PJ" },
        { label: "PF", value: "PF" },
    ];

    const reportStatusOptions = [
        "PROCESSING",
        "SUCCESS",
        "ERROR_SERASA",
        "ERROR_PIPEFY",
    ];

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Entity Type</Form.Label>
                {entityTypes.map(({ label, value }) => (
                    <Controller
                        key={value}
                        name="type"
                        control={control}
                        render={({ field }) => renderRadio(label, value, field)}
                    />
                ))}
            </Form.Group>

            <Form.Group>
                <Form.Label>Document Number</Form.Label>
                <Form.Control
                    type="text"
                    {...register("documentNumber", { required: true })}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Pipefy ID</Form.Label>
                <Form.Control type="text" {...register("pipefyId")} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Report Status</Form.Label>
                <Form.Control
                    as="select"
                    {...register("status", { required: true })}
                >
                    {reportStatusOptions.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Button className="button-submit" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default SerasaReportForm;
