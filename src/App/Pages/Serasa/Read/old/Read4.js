import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { SerasaPartnerReport, SerasaReport } from "../../../../../models";
import { useParams } from "react-router-dom";
import { Storage } from "@aws-amplify/storage";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../../servicer/novoGeradorPDF/main";
import Results from "../../../../Containers/Searches/Result/Results";
import CreatePartnerButton from "../components/CreatePartnerButton";

const getAssociatedPartnerReports = async (serasaReportId) => {
  try {
    return await DataStore.query(SerasaPartnerReport, (report) =>
      report.serasareportID.eq(serasaReportId)
    );
  } catch (error) {
    console.error("Error fetching associated SerasaPartnerReports:", error);
    throw error;
  }
};

const getItem = async (id) => {
  try {
    const serasaReport = await DataStore.query(SerasaReport, id);
    if (!serasaReport) {
      console.error("SerasaReport not found for ID:", id);
      return null;
    }
    const partnerReports = await getAssociatedPartnerReports(id);
    return { ...serasaReport, serasaPartnerReports: partnerReports };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

let subscription;

const subscribeToPartnerReports = (serasaReportId, onUpdate) => {
  subscription = DataStore.observe(SerasaPartnerReport).subscribe((msg) => {
    if (msg.element.serasareportID === serasaReportId) {
      onUpdate(msg.element);
    }
  });
};

const unsubscribeFromPartnerReports = () => {
  if (subscription) {
    subscription.unsubscribe();
  }
};

const Partner = ({ combinedPartners }) => {
  console.log({ combinedPartners });
  return (
    <>
      {combinedPartners?.length > 0 && (
        <Card>
          <Card.Header>
            <h2>Partner Report</h2>
          </Card.Header>
          <Card.Body>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CNPJ</th>
                  <th>% Participação</th>
                  <th>Status</th>
                  <th>Arquivo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {combinedPartners.map((partner) => (
                  <tr key={partner.id}>
                    <td>{partner.id}</td>
                    <td>{partner.documentNumber}</td>
                    <td>{partner.participationPercentage}</td>
                    <td>{partner?.status || "-"}</td>
                    <td>{partner?.filePath || "-"}</td>
                    <td>
                      <CreatePartnerButton partner={partner} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
const ReadPartnerReport = ({ partners, fileContent }) => {
  const {
    optionalFeatures: {
      partner: { PartnerResponse = { results: [] }, partnershipResponse = [] }
    }
  } = fileContent;

  const partnerList = [...PartnerResponse.results, ...partnershipResponse];

  // Combine partner data
  const combinePartners = () => {
    return partners?.map((partner) => {
      const document_key =
        partner.type === "PF" ? "businessDocument" : "documentId";
      const response = partnerList.find(
        (r) => r[document_key] === partner.documentNumber
      );

      return response
        ? {
            ...partner,
            participationPercentage: response.participationPercentage
          }
        : partner;
    });
  };

  const combinedPartners = combinePartners();

  return (
    <Container>
      <Partner combinedPartners={combinedPartners} />
    </Container>
  );
};

const Read = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    getItem(id).then((data) => {
      setModel(data);
      setPartners(data.serasaPartnerReports);
    });

    subscribeToPartnerReports(id, (newPartnerReport) => {
      setPartners((prevReports) => [...prevReports, newPartnerReport]);
    });

    return () => {
      unsubscribeFromPartnerReports();
    };
  }, [id]);

  const fetchData = async () => {
    try {
      const fetchedModel = await getItem(id);
      setModel(fetchedModel);
      setPartners(fetchedModel.serasaPartnerReports);
      const result = await Storage.get(`serasa/${id}.json`, {
        download: true,
        level: "public"
      });
      const blob = result.Body;
      const text = await blob.text();
      const jsonContent = JSON.parse(text);
      setFileContent(jsonContent);
      setReports(jsonContent.reports);
      setResponse(jsonContent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDownloadPDF = () => {
    const reportType = model.type === "PF" ? "consumer" : "company";
    const ddData =
      model.type === "PF"
        ? generateDDPF(fileContent)
        : generateDDPJ(fileContent);
    const reportName = fileContent.reports[0].registration[reportType + "Name"];
    createPDF(ddData, reportName);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Serasa Report</h1>
      <Row>
        <Col md={3}>
          {model && (
            <Table responsive className="table">
              <thead>
                <tr>
                  <th scope="col">Document Number</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{model.documentNumber}</td>
                  <td>{model.type}</td>
                  <td>{model.status}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
      {fileContent && (
        <Row>
          <Container>
            <h1>Create Serasa Report</h1>
            <Col>
              <Card>
                <Card.Body>
                  {reports?.length > 0 && <Results list={reports} />}
                  {model?.SerasaPartnerReports?.map((i) => (
                    <span>{i.type}</span>
                  ))}
                  <br />
                  {reports.length > 0 && (
                    <Button onClick={handleDownloadPDF}>
                      Baixar Relatório PDF
                    </Button>
                  )}
                </Card.Body>
              </Card>
              <Card>
                {reports.length > 0 && (
                  <ReadPartnerReport
                    fileContent={fileContent}
                    partners={partners}
                    pfOuPj="PJ"
                  />
                )}
              </Card>
            </Col>
          </Container>
        </Row>
      )}
    </div>
  );
};

export default Read;
