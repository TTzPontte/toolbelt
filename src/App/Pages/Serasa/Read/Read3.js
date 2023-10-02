import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Storage } from "@aws-amplify/storage";
import useToast from "./useToast";
import { getReportById } from "./hepers_gql";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/pdf_helpers/Pdf/main";
import ReadPartnerReport from "./components/Partner";

const IdentificationSection = ({ data }) => {
  // Replace the placeholders with actual data
  const {
    razaoSocial = "Placeholder for Razão Social",
    cnpj = "Placeholder for CNPJ",
    dataAbertura = "Placeholder for Data de Abertura",
    situacaoCnpj = "Placeholder for Situação do CNPJ"
  } = data;

  return (
    <section>
      <h2>Identificação</h2>
      <Table className="table table-bordered">
        <thead>
          <tr>
            <th>Razão Social</th>
            <th>CNPJ</th>
            <th>Data de Abertura</th>
            <th>Situação do CNPJ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{razaoSocial}</td>
            <td>{cnpj}</td>
            <td>{dataAbertura}</td>
            <td>{situacaoCnpj}</td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
};

const DocumentInfo = ({ model }) => {
  if (!model) return null;

  const tableHeaders = ["Document Number", "Type", "Status"];
  const tableData = [model.documentNumber, model.type, model.status];

  return (
    <Col md={3}>
      <Table responsive className="table">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {tableData.map((data, index) => (
              <td key={index}>{data}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Col>
  );
};

const ShowReport = ({ reports }) => {
  if (!reports || reports.length === 0) return null;
  return <Container>{JSON.stringify({ r: reports[0] })}</Container>;
};

const NegativeInformationTable = ({ title, summary }) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>{summary?.count}</th>
        <th>Valor Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{summary?.balance || "Placeholder for Balance"}</td>
        <td>{summary?.credor || "Placeholder for Credor"}</td>
        <td>{summary?.valor || "Placeholder for Valor"}</td>
        <td>{summary?.data || "Placeholder for Data"}</td>
        <td>{summary?.cidade || "Placeholder for Cidade"}</td>
        <td>{summary?.estado || "Placeholder for Estado"}</td>
        <td>{summary?.resumo || "Placeholder for Resumo"}</td>
      </tr>
    </tbody>
  </table>
);

const Read = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [reports, setReports] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { getSerasaReport: data }
        } = await getReportById(id);

        if (!data) {
          console.error("SerasaReport not found for ID:", id);
          showToast("SerasaReport not found");
          return;
        }

        const newObj = {
          ...data,
          serasaPartnerReports: data?.SerasaPartnerReports?.items
        };

        setModel(newObj);
        setReports(newObj.serasaPartnerReports);
        const jsonContent = await fetchJson(id);
        console.log({ fileContent });
        setFileContent(jsonContent);
        showToast("Successfully Loaded");
      } catch (error) {
        console.error("Error fetching data:", error);
        showToast("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const fetchJson = async (id) => {
    try {
      const result = await Storage.get(`serasa/${id}.json`, {
        download: true,
        level: "public"
      });

      const blob = result.Body;
      const text = await blob.text();
      return JSON.parse(text);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      showToast("Error fetching JSON data");
      return null;
    }
  };

  const handleDownloadPDF = () => {
    if (!model || !fileContent || reports.length === 0) return;

    const reportType = model.type === "PF" ? "consumer" : "company";
    const ddData =
      model.type === "PF"
        ? generateDDPF(fileContent)
        : generateDDPJ(fileContent);
    const reportName = fileContent.reports[0].registration[reportType + "Name"];
    createPDF(ddData, reportName);
  };

  const renderHeader = () => (
    <header className="bg-primary text-center p-3">
      <h1 className="text-white">Serasa</h1>
    </header>
  );

  const renderSection = (sectionTitle, content) => (
    <section>
      <h2>{sectionTitle}</h2>
      {content}
    </section>
  );

  return (
    <div>
      {renderHeader()}

      <IdentificationSection data={model}/>
      {renderSection(
        "Score",
        <div className="row">
          <div className="col">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{model?.score}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col">
            <p>Probability of Inadimplência: {model?.defaultRate}</p>
          </div>
        </div>
      )}

      {renderSection(
        "Dados de negativação",
        <>
          <NegativeInformationTable
            title="Pefin (Natureza)"
            summary={model?.negativeData?.pefin?.summary}
          />
          <NegativeInformationTable
            title="Refin (Natureza)"
            summary={model?.negativeData?.refin?.summary}
          />
          <NegativeInformationTable
            title="Protestos (Natureza)"
            summary={model?.negativeData?.collectionRecords?.summary}
          />
        </>
      )}

      {renderSection(
        "Participação Societária",
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>CPF/CNPJ</th>
              <th>Sócio</th>
              <th>Participação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Placeholder for CPF/CNPJ</td>
            </tr>
          </tbody>
        </table>
      )}

      {reports.length > 0 && (
        <Row>
          <Container>
            <h1>Create Serasa Report</h1>
            <Col>
              <Card>
                <Card.Body>
                  <ShowReport reports={reports} />
                  <Button onClick={handleDownloadPDF}>
                    Baixar Relatório PDF
                  </Button>
                </Card.Body>
              </Card>
              <Card>
                <ReadPartnerReport
                  fileContent={fileContent}
                  partners={model?.serasaPartnerReports}
                  pfOuPj="PJ"
                />
              </Card>
            </Col>
          </Container>
        </Row>
      )}
    </div>
  );
};

export default Read;
