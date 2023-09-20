import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button, Card, Container, Table } from "react-bootstrap";
import React from "react";
import {
    createPDF,
    generateDDPF,
    generateDDPJ
} from "../../../../servicer/novoGeradorPDF/main";
import {getEnvironment, invokeLambda} from "../hepers";

const ReadPartnerReport = ({ partners }) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      partners: partners.map(() => ({ selected: false }))
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "partners"
  });

  const onSubmit = async () => {
    const functionName = "ApiSerasa-serasa";
    console.log("Consultar Sócios clicado");

    const selectedPartners = partners.filter((partner) => partner.selected);

    for (const partner of selectedPartners) {
      const { documento } = partner; // Assuming 'documento' is a property in your partner object
      try {
        const payload = {
          numDocument: documento,
          tipoPessoa: documento.length <= 12 ? "PF" : "PJ",
          ambiente: getEnvironment()
        };

        const responseOpcional = await invokeLambda(functionName, payload);
        const result = JSON.parse(responseOpcional.Payload);
        const responseSerasa = result.response;

        if (payload.tipoPessoa === "PF") {
          handlePFCases(responseSerasa);
        } else {
          handlePJCases(responseSerasa);
        }
      } catch (error) {
        console.error("Ocorreu um erro na requisição:", error);
        alert(
          `Erro ao gerar relatório para: ${documento}. Detalhes do erro: ${error.message}`
        );
      }
    }
  };

  const handlePFCases = (responseSerasa) => {
    const nomeJsonSocioPF = responseSerasa.reports[0].registration.consumerName;
    const ddSocioPF = generateDDPF(responseSerasa);
    createPDF(ddSocioPF, nomeJsonSocioPF);
  };

  const handlePJCases = (responseSerasa) => {
    const nomeJsonSocioPJ = responseSerasa.reports[0].registration.companyName;
    const ddSocioPJ = generateDDPJ(responseSerasa);
    createPDF(ddSocioPJ, nomeJsonSocioPJ);
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
                    <td>{partner.CNPJ}</td>
                    <td>{partner.participationPercentage}</td>
                    <td>{partner.updateDate}</td>
                    <td>{partner.participationInitialDate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="primary" type="submit">
              Consultar Sócios
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default ReadPartnerReport;
