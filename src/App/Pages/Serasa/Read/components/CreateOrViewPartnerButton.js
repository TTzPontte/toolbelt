import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { invokeLambda } from "../hepers";
import { Storage } from "@aws-amplify/storage";
import {generateDDPJ, createPDF} from "../../../../servicer/pdf_helpers/main";
const CreateReport = async (partner, setLoadingState) => {
  try {
    await invokeLambda("toolbelt3-CreateToolbeltPartnerReport-TpyYkJZlmEPi", partner);
  } catch (error) {
    console.error("Error invoking Lambda:", error);
  } finally {
    setLoadingState(false);
  }
};

const ViewReport = async (partner, setLoadingState) => {
  try {
    const fileKey = `serasa/${partner?.id}.json`;
    const response = await Storage.get(fileKey, {
      download: true,
      level: "public",
      validateObjectExistence: true,
    });

    const jsonContent = JSON.parse(await response.text());
    const reportType = partner.type === "PF" ? "consumer" : "company";
    const ddData = generateDDPJ(jsonContent.data);
    const reportName = jsonContent.data.reports[0].registration[`${reportType}Name`];
    createPDF(ddData, reportName);
  } catch (error) {
    console.error("Error downloading report:", error);
  } finally {
    setLoadingState(false);
  }
};

const CreateOrViewPartnerButton = ({ partner, setLoading }) => {
  const [loading, setLoadingState] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoadingState(true);

    if (partner.filePath) {
      await ViewReport(partner, setLoadingState);
    } else {
      await CreateReport(partner, setLoadingState);
    }
  };

  return (
      <Button
          className="btn-sm"
          onClick={handleClick}
          variant="primary"
          disabled={loading}
      >
        {partner.filePath ? "View Report" : "Create Report"}
      </Button>
  );
};

export default CreateOrViewPartnerButton;
