import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { fetchReport } from "../helpers";
import {
    createPDF,
    generateDDPF,
    generateDDPJ
} from "../../../../servicer/pdf_helpers/main";
import { fetchAndGenerateReport, mergePartner } from "./partnerHelpers";

const useLoading = () => {
    const [loading, setLoading] = useState(false);
    return {
        loading,
        startLoading: useCallback(() => setLoading(true), []),
        stopLoading: useCallback(() => setLoading(false), [])
    };
};

const PartnerRow = ({ partner }) => {
    const { loading, startLoading, stopLoading } = useLoading();
    const [partnerData, setPartnerData] = useState(partner);

    const handleReport = async () => {
        startLoading();
        try {
            const jsonContent = await fetchReport(partnerData.id);
            const isConsumer = partnerData.type === "PF";
            const ddData = isConsumer
                ? generateDDPF(jsonContent)
                : generateDDPJ(jsonContent);
            const reportName =
                jsonContent.reports[0].registration[
                    isConsumer ? "consumerName" : "companyName"
                    ];
            createPDF(ddData, reportName);
        } catch (error) {
            console.error("Error handling report:", error);
        } finally {
            stopLoading();
        }
    };

    const handleClick = async () => {
        if (partnerData.filePath) {
            handleReport();
        } else {
            const { error } = await fetchAndGenerateReport(partnerData);
            if (!error) {
                // Update partner data if necessary
            }
        }
    };

    return (
        <tr>
            <td>{partnerData.id}</td>
            <td>{partnerData.documentNumber}</td>
            <td>{partnerData.participationPercentage}</td>
            <td>{partnerData.status || "-"}</td>
            <td>
                <Button
                    className="btn-sm"
                    onClick={handleClick}
                    variant="primary"
                    disabled={loading}
                >
                    {loading
                        ? "Loading..."
                        : partnerData.filePath
                            ? "View Report"
                            : "Create Report"}
                </Button>
            </td>
        </tr>
    );
};

const getPartners = fileContent => {
    const {
        optionalFeatures: {
            partner: { PartnerResponse = { results: [] }, partnershipResponse = [] }
        }
    } = fileContent;
    return [...partnershipResponse, ...PartnerResponse.results];
};

const ReadPartnerReport = ({ partners, fileContent }) => {
    const partnerList = getPartners(fileContent);
    const mergedPartners = partners.map(partner => mergePartner(partner, partnerList));
    const [mergedPartnerList, setMergedPartnerList] = useState(mergedPartners);

    useEffect(() => {
        setMergedPartnerList(mergedPartners);
    }, []);

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
                        {mergedPartnerList.map(partner => (
                            <PartnerRow key={partner.id} partner={partner} />
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ReadPartnerReport;
