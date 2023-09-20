import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { ListGroup } from 'react-bootstrap';
import { SerasaReport } from "../../../../models";
import { useParams } from "react-router-dom";
import { Storage } from "@aws-amplify/storage";
import ReadReportResults from "../Create/new/ReadReportResults";
import {createPDF, generateDDPF, generateDDPJ} from "../../../servicer/novoGeradorPDF/main";

const Read = (props) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");
  const handlePartners = (fileContent, personType) => {
    if (personType === "PJ") {
      if (fileContent?.response?.optionalFeatures?.partner?.PartnerResponse?.results) {
        const filteredPartners = fileContent.response.optionalFeatures.partner.PartnerResponse.results.filter(
            (partner) => partner.participationPercentage > 0
        );
        setPartners(filteredPartners);
      }
    } else if (personType === "PF") {
      if (fileContent?.response?.optionalFeatures?.partner?.partnershipResponse) {
        const filteredPartners = fileContent.response.optionalFeatures.partner.partnershipResponse.filter(
            (partner) => partner.participationPercentage > 0
        );
        setPartners(filteredPartners);
      }
    }
  };

  const [fileContent, setFileContent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedModel = await DataStore.query(SerasaReport, id);
      console.log({ fetchedModel });
      setModel(fetchedModel);

      // Fetch file from storage
      const result = await Storage.get(`serasa/${id}.json`, { download: true, level: 'public' });
      const blob = result.Body;
      const text = await blob.text();
      const jsonContent = JSON.parse(text);
      setFileContent(jsonContent);
      setReports(jsonContent.response.reports);

      // Call handlePartners function here
      handlePartners(jsonContent, fetchedModel.type);  // Assuming 'type' is where you store personType in the model
    };

    fetchData();
  }, []);
  const handleDownloadPDF = () => {
    if (personType === "PF") {
      const ddPF = generateDDPF(response);
      var nomeJsonPF = response.reports[0].registration.consumerName;
      createPDF(ddPF, nomeJsonPF);
    } else {
      const ddPJ = generateDDPJ(response);
      var nomeJsonPJ = response.reports[0].registration.companyName;
      createPDF(ddPJ, nomeJsonPJ);
    }
  };
  return (
      <div>
        <h1>Fetched Serasa Reports</h1>
        <ListGroup>
          {model && (
              <ListGroup.Item>
                Document Number: {model.documentNumber}, Type: {model.type}, Status: {model.status}
              </ListGroup.Item>
          )}
        </ListGroup>
        {fileContent && (
            <div>
              <h2>Fetched File Content from Storage</h2>
              <ReadReportResults {...{ partners, reports, handleDownloadPDF }} />
            </div>
        )}
      </div>
  );
};

export default Read;
