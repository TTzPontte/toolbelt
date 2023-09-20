import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, Container, Table } from "react-bootstrap";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../../servicer/novoGeradorPDF/main";
import {getEnvironment, invokeLambda} from "../hepers";

const ReadPartnerReport = ({ partners }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      partners: partners.map((partner) => ({ documentNumber:partner.businessDocument,type:"PJ", selected: false }))
    }
  });

  const handleGeneratePDF = async (documento, tipoPessoa) => {
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

      if (tipoPessoa === "PF") {
        const nomeJsonSocioPF =
          responseSerasa.reports[0].registration.consumerName;
        const ddSocioPF = generateDDPF(responseSerasa);
        createPDF(ddSocioPF, nomeJsonSocioPF);
      } else {
        const nomeJsonSocioPJ =
          responseSerasa.reports[0].registration.companyName;
        const ddSocioPJ = generateDDPJ(responseSerasa);
        createPDF(ddSocioPJ, nomeJsonSocioPJ);
      }
    } catch (error) {
      console.error("Ocorreu um erro na requisição:", error);
      alert(
        `Erro ao gerar relatório para: ${documento}. Detalhes do erro: ${error.message}`
      );
    }
  };

  const onSubmit = async (data) => {
    console.log({data})
    setIsLoading(true);
    const selectedPartners = data.partners.filter(
      (partner) => partner.selected
    );

    for (const partner of selectedPartners) {
      const { documentNumber, type } = partner;
      console.log({partner})
      if (documentNumber) {
        await handleGeneratePDF(documentNumber, type);
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
                {partners.map((partner, index) => (
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
                ))}
              </tbody>
            </Table>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Consultar Sócios"}
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReadPartnerReport;
