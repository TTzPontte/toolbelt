import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import {ListGroup, Table} from 'react-bootstrap';
import { SerasaReport } from "../../../../models";
import { useParams } from "react-router-dom";
import { Storage } from "@aws-amplify/storage";
import ReadReportResults from "../Create/new/ReadReportResults";
import { createPDF, generateDDPF, generateDDPJ } from "../../../servicer/novoGeradorPDF/main";

const Read = () => {
  const [model, setModel] = useState(null);
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [response, setResponse] = useState([]);
  const [personType, setPersonType] = useState("");
  const [fileContent, setFileContent] = useState(null);
  const { id } = useParams();

  const handlePartners = (fileContent, personType) => {
    const partnerData = fileContent?.response?.optionalFeatures?.partner;
    const partners = personType === "PJ" ? partnerData?.PartnerResponse?.results : partnerData?.partnershipResponse;
    if (partners) {
      const filteredPartners = partners.filter((partner) => partner.participationPercentage > 0);
      setPartners(filteredPartners);
    }
  };

  const fetchData = async () => {
    const fetchedModel = await DataStore.query(SerasaReport, id);
    setModel(fetchedModel);

    const result = await Storage.get(`serasa/${id}.json`, { download: true, level: 'public' });
    const blob = result.Body;
    const text = await blob.text();
    const jsonContent = JSON.parse(text);
    setFileContent(jsonContent);
    setReports(jsonContent.response.reports);

    handlePartners(jsonContent, fetchedModel.type);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const dd = personType === "PF" ? generateDDPF(response) : generateDDPJ(response);
    const name = personType === "PF" ? response.reports[0].registration.consumerName : response.reports[0].registration.companyName;
    createPDF(dd, name);
  };

  return (
      <div>
        <h1>Fetched Serasa Reports</h1>
        <ListGroup>
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
