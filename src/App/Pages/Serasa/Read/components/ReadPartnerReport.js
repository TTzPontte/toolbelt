import React, { useCallback, useEffect, useState } from "react";
import { fetchReport, invokeLambda } from "../hepers";
import {generateDDPF, generateDDPJ, createPDF} from "../../../../servicer/pdf_helpers/Pdf/main";

import { Button, Card, Container, Table } from "react-bootstrap";

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);

  return [loading, startLoading, stopLoading];
};

const fetchReportForPartner = async (partner, handleViewReport) => {
  try {
    const { Payload } = await invokeLambda(
      "toolbelt3-CreateToolbeltPartnerReport-TpyYkJZlmEPi",
      partner
    );
    const { response } = JSON.parse(Payload);
    handleViewReport(response)
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const mergePartner = (partner, partnerList) => {
  const documentKey =
    partner.documentNumber.length > 11 ? "businessDocument" : "documentId";
  const matchedPartner = partnerList.find(
    (p) => p[documentKey] === partner.documentNumber
  );

  return matchedPartner
    ? {
        ...partner,
        participationPercentage: matchedPartner.participationPercentage
      }
    : partner;
};

const Partner = ({ partner, onReportDownload }) => {
  const [loading, startLoading, stopLoading] = useLoading();
  const [partnerData, setPartnerData] = useState(partner);
  const [result, setResult] = useState();
  const handleViewReport = async () => {
    // startLoading();
      const jsonContent = await fetchReport(partner.id);
    try {
      // const jsonContent = await fetchReport(partner.id);
      const reportType = partner.type === "PF" ? "consumer" : "company";
      jsonContent.reports[0].registration['documentNumber'] = partner.documentNumber
    debugger
      const ddData =
        reportType === "consumer"
          ? generateDDPF(jsonContent)
          : generateDDPJ(jsonContent);

      createPDF(
        ddData,
        jsonContent.reports[0].registration[`${reportType}Name`]
      );
    } catch (error) {
      console.error("Error downloading report:", error);
    } finally {
      // stopLoading();
    }
  };

  const handleClick = async () => {
    console.log("handleClick");
    console.log({ result });
    if (partner?.filePath || result?.reports?.length > 0) {
      console.log("partner.filePath || result?.report?.length>0");
      handleViewReport(result);
    } else {
      startLoading();
      const response = await fetchReportForPartner(partner, handleViewReport);
      setResult(response);

      if (response.reports.length > 0) {
        setPartnerData({
          ...partnerData,
          status: "SUCCESS",
          filePath: `serasa/${partner.id}`
        });
      }
    }
    stopLoading();
  };

  const buttonLabel = loading
    ? "Loading..."
    : partnerData?.filePath
    ? "View Report"
    : "Create Report";

  return (
    <tr>
      <td>{partnerData.id}</td>
      <td>{partnerData.documentNumber}</td>
      <td>{partnerData.participationPercentage}</td>
      <td>{partnerData.status || "-"}</td>
      <td>
        <Button
        className={"btn-primary btn pp-btn-md btn-outline-light"}
          onClick={handleClick}
          variant="primary"
          disabled={loading}
        >
          {buttonLabel}
        </Button>
      </td>
    </tr>
  );
};

const PartnerTableRow = ({ partner, partnerList, onReportDownload }) => {
  const [mergedPartner, setMergedPartner] = useState(partner);

  useEffect(() => {
    setMergedPartner(mergePartner(partner, partnerList));
  }, [partner, partnerList]);

  return (
    <Partner partner={mergedPartner} onReportDownload={onReportDownload} />
  );
};

const mergeAllPartners = (partners, partnerList) => {
  return partners.map((partner) => mergePartner(partner, partnerList));
};

const ReadPartnerReport = ({ partners, fileContent }) => {
  const {
    optionalFeatures: {
      partner: {
        PartnerResponse = { results: [] },
        partnershipResponse = []
      } = {}
    } = {}
  } = fileContent;

  const partnerList = [...(PartnerResponse?.results || []), ...(partnershipResponse || [])];
  const onReportDownload = () => {
    // Handle report download
  };

  const mergedPartners = mergeAllPartners(partners, partnerList);

  return (
    <Container>
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
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {mergedPartners.map((partner) => (
                <PartnerTableRow
                  key={partner.id}
                  partner={partner}
                  partnerList={partnerList}
                  onReportDownload={onReportDownload}
                />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReadPartnerReport;
