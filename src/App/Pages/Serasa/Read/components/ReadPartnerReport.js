import React, { useState } from "react";
import { invokeLambda } from "../hepers";
import { Storage } from "@aws-amplify/storage";
import {
  createPDF,
  generateDDPJ
} from "../../../../servicer/pdf_helpers/Pdf/main";
import { Button, Card, Container, Table } from "react-bootstrap";

const ReadPartnerReport = ({ partners, fileContent }) => {
  const Partner = ({ combinedPartners }) => {
    const CreatePartnerButton = ({ partner, setLoading }) => {
      const [loading, setLoadingState] = useState(false);

      const { filePath } = partner;

      const handleCreateReport = async () => {
        if (loading) return;

        setLoadingState(true);

        try {
          await invokeLambda(
            "toolbelt3-CreateToolbeltPartnerReport-TpyYkJZlmEPi",
            partner
          );
        } catch (error) {
          console.error("Error invoking Lambda:", error);
        } finally {
          setLoadingState(false);
          // setLoading(false);
        }
      };

      const handleViewReport = async () => {
        if (loading) return;

        setLoadingState(true);

        try {
          const fileKey = `serasa/${partner?.id}.json`;

          const response = await Storage.get(fileKey, {
            download: true,
            level: "public",
            validateObjectExistence: true
          });
          const blob = response.Body;
          const text = await blob.text();
          const jsonContent = JSON.parse(text);
          const reportType = partner.type === "PF" ? "consumer" : "company";
          console.log({ jsonContent });
          const ddData = generateDDPJ(jsonContent.data);
          const reportName =
            jsonContent.data.reports[0].registration[reportType + "Name"];
          createPDF(ddData, reportName);
          // Create a blob from the file data
        } catch (error) {
          console.error("Error downloading report:", error);
        } finally {
          setLoadingState(false);
        }
      };

      return (
        <Button
          className="btn-sm"
          onClick={filePath ? handleViewReport : handleCreateReport}
          variant="primary"
          disabled={loading}
        >
          {filePath ? "View Report" : "Create Report"}
        </Button>
      );
    };

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
export default ReadPartnerReport;
