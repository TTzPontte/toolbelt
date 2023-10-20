import React from 'react';
import {cnpj, cpf} from "cpf-cnpj-validator";
import {Form, FormGroup} from "react-bootstrap";
import {Controller} from "react-hook-form";
const DocumentInput = ({ control, documentType, error }) => {
    const dType = documentType === "PF"? "CPF" : "CNPJ"

    const validateDocument = (value) => {
        if (!value) {
            return `${dType} é obrigatório`;
        }
        console.log({ documentType });
        const isValid =
            documentType === "PF" ? cpf.isValid(value) : cnpj.isValid(value);
        if (!isValid) {
            return `${dType} inválido`;
        }

        return true;
    };

    return (
        <FormGroup controlId="documentNumber">
            <Form.Label>Número do Documento:</Form.Label>
            <Controller
                name="documentNumber"
                control={control}
                render={({ field }) => (
                    <>
                        <Form.Control type="text" placeholder={dType} {...field} />
                        {error && <p className="text-danger">{error.message}</p>}
                    </>
                )}
                rules={{ validate: validateDocument }}
            />
        </FormGroup>
    );
};


export default DocumentInput;
