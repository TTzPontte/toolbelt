import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Card, Container, Table } from "react-bootstrap";
import {
  updateReport,
  uploadToStorage,
  getEnvironment,
  invokeLambda
} from "../Create/hepers";
import {
  EntityType,
  ReportStatus,
  SerasaPartnerReport,
  SerasaReport
} from "../../../../models";
import { DataStore } from "@aws-amplify/datastore";

const createReport = async (payload) => {
  const item = await DataStore.save(
    new SerasaReport({
      documentNumber: payload.numDocument,
      pipefyId: payload.idPipefy,
      type: EntityType.PF,
      status: ReportStatus.PROCESSING
    })
  );
  console.log({ item });
  return item;
};
const createPartnerReport = async (payload, id) => {
  const item = await DataStore.save(
    new SerasaPartnerReport({
      documentNumber: payload.numDocument,
      pipefyId: payload.idPipefy,
      type: EntityType.PF,
      status: ReportStatus.PROCESSING,
      serasareportID: id
    })
  );
  console.log({ item });
  return item;
};

const PartnerRow = ({ partner, control, index }) => {
  return (
    <tr key={partner.id}>
      <td>
        <Controller
          name={`partners[${index}].selected`}
          control={control}
          render={({ field }) => <input type="checkbox" {...field} />}
        />
      </td>
      <td>{partner.documentNumber}</td>
      <td>{partner.participationPercentage}</td>
      <td>{partner.updateDate}</td>
      <td>{partner.participationInitialDate}</td>
    </tr>
  );
};

const ReadPartnerReport = ({ partners, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      partners: partners.map((partner) => ({
        ...partner,
        documentNumber: partner.businessDocument,
        type: "PJ",
        selected: false
      }))
    }
  });
  const { fields } = useFieldArray({
    control,
    name: "partners"
  });
  console.log({ partners });
  const onSubmit = async (data) => {
    setIsLoading(true);
    const selectedPartners = data.partners.filter(
      (partner) => partner.selected
    );

    for (const partner of selectedPartners) {
      const { documentNumber, type } = partner;
      if (documentNumber) {
        const ambiente = getEnvironment();
        const payload = {
          numDocument: documentNumber.replace(/\D/g, ""),
          tipoPessoa: data.personType, // Assuming you have 'personType' in your form data
          idPipefy: data.idPipefy, // Assuming you have 'idPipefy' in your form data
          ambiente
        };

          const reportItem = await createPartnerReport(payload,id);
          const reportId = reportItem.id;
          console.log({ reportId });
        try {

          const result = await invokeLambda(
            "CreateSerasaReport-staging",
            payload
          );
          const requestSerasa = JSON.parse(result.Payload);
          const statusRequest = requestSerasa.statusCode;

          if (statusRequest === 200) {
            await updateReport(reportId, ReportStatus.SUCCESS);
            const response = JSON.parse(result.Payload);
            await uploadToStorage(response, reportId, "fileName");
          }
        } catch (error) {
          // Handle errors appropriately
          console.error(error);
        }
      }
    }

    setIsLoading(false);
    reset(); // Reset the form after submission
  };

  return (
    <Container>
      {partners && partners.length > 0 && (
        <Card>
          <Card.Header>
            <h2>Partner Report</h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Gerar Serasa</th>
                    <th>CNPJ</th>
                    <th>% Participação</th>
                    <th>Data da atualização do status</th>
                    <th>participationInitialDate</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((partner, index) => (
                    <PartnerRow
                      key={partner.id}
                      partner={partner}
                      control={control}
                      index={index}
                    />
                  ))}
                </tbody>
              </Table>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Consultar Sócios"}
              </Button>
            </form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ReadPartnerReport;
