import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { invokeLambda } from "./hepers";
import { Storage } from "@aws-amplify/storage";

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
      setLoading(false);
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

      // Create a blob from the file data
      const blob = new Blob([response.Body]);

      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a hidden anchor element to trigger the download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${partner?.id}.json`;

      // Trigger the click event to start the download
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the temporary URL
      URL.revokeObjectURL(url);
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

export default CreatePartnerButton;
