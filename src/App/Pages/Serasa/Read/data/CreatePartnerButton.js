import React, { useState, useCallback } from "react";
import {
  EntityType,
  ReportStatus,
  SerasaPartnerReport
} from "../../../../models";
import {
  getEnvironment,
  invokeLambda,
  updateReport,
  uploadToStorage
} from "./hepers";
import { DataStore } from "@aws-amplify/datastore";

const formatDocumentNumber = documentNumber => documentNumber.replace(/\D/g, "");

const createPayload = ({ documentNumber, type, pipefyId }) => ({
  documentNumber: formatDocumentNumber(documentNumber),
  type,
  pipefyId,
  ambiente: getEnvironment()
});

const CreatePartnerReportButton = ({ data, model }) => {
  const [status, setStatus] = useState('idle');

  const handleCreateClick = useCallback(async () => {
    setStatus('loading');
    try {
      const payload = createPayload(data);
      const reportItem = await createPartnerReport(payload, model);
      const serasaResponse = await fetchSerasaDataAndHandleResponse(payload, reportItem.id);
      await uploadToStorage(serasaResponse, reportItem.id, "fileName");
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  }, [data, model]);

  const buttonText = {
    idle: "Create Partner Report",
    loading: "...loading",
    success: "Download Report",
    error: "Error. Try Again"
  };

  return (
      <div>
        <button onClick={handleCreateClick} disabled={status === 'loading'}>
          {buttonText[status]}
        </button>
      </div>
  );
};

export default CreatePartnerReportButton;

const createPartnerReport = async (payload, model) => {
  try {
    return await DataStore.save(
        new SerasaPartnerReport({
          ...payload,
          type: EntityType.PF,
          status: ReportStatus.PROCESSING,
          SerasaReportId: model.id
        })
    );
  } catch (error) {
    throw new Error(`Error creating partner report: ${error.message}`);
  }
}

const fetchSerasaDataAndHandleResponse = async (payload, reportId) => {
  try {
    const result = await invokeLambda("CreateSerasaReport-staging", payload);
    const response = JSON.parse(result.Payload);
    if (response.statusCode === 200) {
      await updateReport(reportId, ReportStatus.SUCCESS);
      return response.response;
    } else {
      throw new Error(`Serasa Error: ${response.errorMessage}`);
    }
  } catch (error) {
    await updateReport(reportId, ReportStatus.ERROR_SERASA);
    throw error;
  }
}
