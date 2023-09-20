import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Card, Container, Table } from "react-bootstrap";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/novoGeradorPDF/main";
import { getEnvironment, invokeLambda } from "./hepers";

const PartnerRow = ({ partner, control, index }) => {
  return (
      <tr key={partner.id}>
        <td>
          <Controller
              name={`partners[${index}].selected`}
              control={control}
              render={({ field }) => (
                  <input type="checkbox" {...field} />
              )}
          />
        </td>
        <td>{partner.documentNumber}</td>
        <td>{partner.participationPercentage}</td>
        <td>{partner.updateDate}</td>
        <td>{partner.participationInitialDate}</td>
      </tr>
  );
};

const generateReportData = async (documento, tipoPessoa) => {
  const functionName = "ApiSerasa-serasa";
  try {
    const payload = {
      numDocument: documento,
      tipoPessoa,
      ambiente: getEnvironment()
    };
    const responseOpcional = await invokeLambda(functionName, payload);
    const result = JSON.parse(responseOpcional.Payload);
    const responseSerasa = result.response;

    const nomeJsonSocio =
        tipoPessoa === "PF"
            ? responseSerasa.reports[0].registration.consumerName
            : responseSerasa.reports[0].registration.companyName;

    const ddSocio =
        tipoPessoa === "PF"
            ? generateDDPF(responseSerasa)
            : generateDDPJ(responseSerasa);

    return { nomeJsonSocio, ddSocio };
  } catch (error) {
    console.error("Ocorreu um erro na requisição:", error);
    throw error;
  }
};

const CreateReportPdfButton = ({ nomeJsonSocio, ddSocio }) => {
  const handleClick = () => {
    createPDF(ddSocio, nomeJsonSocio);
  };

  return (
      <Button variant="primary" type="button" onClick={handleClick}>
        Generate Report PDF
      </Button>
  );
};

const ReadPartnerReport = ({ partners }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    const selectedPartners = data.partners.filter(
        (partner) => partner.selected
    );

    for (const partner of selectedPartners) {
      const { documentNumber, type } = partner;
      if (documentNumber) {
        try {
          const { nomeJsonSocio, ddSocio } = await generateReportData(
              documentNumber,
              type
          );
          // Create PDF for each partner
          CreateReportPdfButton({ nomeJsonSocio, ddSocio });
        } catch (error) {
          alert(
              `Erro ao gerar relatório para: ${documentNumber}. Detalhes do erro: ${error.message}`
          );
        }
      }
    }

    setIsLoading(false);
  };

  return (
      <Container>
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
                {isLoading ? "Loading..." : "Generate Partners Report"}
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
  );
};

export default ReadPartnerReport;
