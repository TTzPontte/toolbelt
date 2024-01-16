import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  createPDF,
  generateDDPF,
  generateDDPJ
} from "../../../servicer/pdf_helpers/Pdf/main";
import { downloadJson, fetchJson, getItem } from "./newHelpers";
import ReadPartnerReport from "./components/ReadPartnerReport";
import { toast } from "react-toastify";
import NewResults from "./NewResult/NewResults";

const Read = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedModel = await getItem(id);
        setModel(fetchedModel);
        setPartners(fetchedModel?.serasaPartnerReports);
        const jsonContent = await fetchJson(id);
        setFileContent(jsonContent);
        setReports(jsonContent.reports);
        toast.success("Successfully Loaded");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data:");
      }
    };

    fetchData();
  }, [id]);

  const handleDownloadPDF = () => {
    const reportType = model.type === "PF" ? "consumer" : "company";
    fileContent.reports[0].registration["documentNumber"] =
      model.documentNumber;
    // const _r = fileContent.reports[0].registration?.documentNumber

    const ddData =
      model.type === "PF"
        ? generateDDPF({ ...fileContent, createdAt: model.createdAt })
        : generateDDPJ({ ...fileContent, createdAt: model.createdAt });
    const reportName = fileContent.reports[0].registration[reportType + "Name"];
    createPDF(ddData, reportName);
    downloadJson(id)

  };

  return (
    <div>
      {fileContent && (
        <Row>
          <Container>

            <Row>{reports?.length > 0 && <NewResults reports={reports} handleDownloadPDF={handleDownloadPDF} />}</Row>
            <Row>
              {reports.length > 0 && (
                <Card>
                  <Card.Body>
                    {partners?.length > 0 ? (
                      <ReadPartnerReport
                        fileContent={fileContent}
                        partners={partners}
                        pfOuPj="PJ"
                      />
                    ) : (
                      <Row className={"btn btn-outline-danger"}>
                        <Col>
                          <h3>{"Não Possui Informações Societárias"}</h3>
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              )}
            </Row>
          </Container>
        </Row>
      )}
    </div>
  );
};

export default Read;
