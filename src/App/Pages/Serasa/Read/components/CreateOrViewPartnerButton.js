import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { invokeLambda } from "../hepers";
import { Storage } from "@aws-amplify/storage";
import {createPDF, generateDDPJ} from "../../../../servicer/novoGeradorPDF/main";

const CreateOrViewPartnerButton = ({ partner, setLoading }) => {
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
        validateObjectExistence: true,
      });
      const blob = response.Body;
      const text = await blob.text();
      const jsonContent = JSON.parse(text);
      const reportType = partner.type === "PF" ? "consumer" : "company";
      console.log({jsonContent})
      const ddData = generateDDPJ(jsonContent.data);
      const reportName = jsonContent.data.reports[0].registration[reportType + "Name"];
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

export default CreateOrViewPartnerButton;
