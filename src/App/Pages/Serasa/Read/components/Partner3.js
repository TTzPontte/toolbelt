// Custom hook for loading state
import React, {useCallback, useEffect, useState} from "react";
import {fetchReport, invokeLambda} from "../helpers";
import {createPDF, generateDDPF, generateDDPJ} from "../../../../servicer/pdf_helpers/main";
import {Button, Card, Container, Table} from "react-bootstrap";
import {DataStore} from "@aws-amplify/datastore";
import {SerasaPartnerReport} from "../../../../../models";

const useLoading = () => {
    const [loading, setLoading] = useState(false);
    const startLoading = useCallback(() => setLoading(true), []);
    const stopLoading = useCallback(() => setLoading(false), []);

    return [loading, startLoading, stopLoading];
};

// Fetch report for a given partner
const fetchReportForPartner = async (
    partner,
    stopLoading,
    setResponse,
    setPartnersList
) => {
    try {
        const {Payload} = await invokeLambda(
            "toolbelt3-CreateToolbeltPartnerReport-TpyYkJZlmEPi",
            partner
        );
        const {response} = JSON.parse(Payload);
        const {
            optionalFeatures: {
                partner: {PartnerResponse = {results: []}, partnershipResponse = []}
            }
        } = response;

        console.log({response});
        setResponse(response);
        setPartnersList([...PartnerResponse.results, ...partnershipResponse]);
        return response;
    } catch (error) {
        console.error("Error:", error);
    } finally {
        stopLoading();
    }
};

// Merge partner data with partner list
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

// Component for rendering a partner row
const Partner = ({
                     partner,
                     partnerList,
                     loading,
                     startLoading,
                     stopLoading
                 }) => {
    const [partnersList, setPartnersList] = useState(partnerList);
    const [mergedPartner, setMergedPartner] = useState(partner);
    const [response, setResponse] = useState();
    const handleViewReport = async () => {
        startLoading();
        try {
            let  jsonContent;
            if (response){
            jsonContent = response
            }
            else{

             jsonContent = await fetchReport(partner.id);
            }
            const reportType = partner.type === "PF" ? "consumer" : "company";
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
            stopLoading();
        }
    };

    useEffect(() => {
        setMergedPartner(mergePartner(partner, partnersList));
    }, [partner, partnerList]);

    const buttonLabel = loading
        ? "Loading..."
        : mergedPartner?.filePath
            ? "View Report"
            : "Create Report";


    const getPartner = ({
                            optionalFeatures: {
                                partner: {PartnerResponse = {results: []}, partnershipResponse = []}
                            }
                        }) => {
        return [...partnershipResponse, ...PartnerResponse.results]
    }

    const handleClick = async () => {
        startLoading();

        try {
            if (partner.filePath) {
                // If there's a filePath, handleViewReport
                await handleViewReport();
            } else {
                // Otherwise, fetch the report for the partner
                const response = await fetchReportForPartner(
                    partner,
                    stopLoading,
                    setResponse,
                    setPartnersList
                );

                if (response) {
                    setResponse(response);
                }

            }
        } catch (error) {
            console.error("Error handling click:", error);
        } finally {
            stopLoading();
        }
    };


    return (
        <tr>
            <td>{mergedPartner.id}</td>
            <td>{mergedPartner.documentNumber}</td>
            <td>{mergedPartner.participationPercentage}</td>
            <td>{mergedPartner.status || "-"}</td>
            <td>
                <Button
                    className="btn-sm"
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

// Component for rendering a partner row from DataStore
const PartnerTableRow = ({partner, partnerList}) => {
    const [fetchedPartner, setFetchedPartner] = useState(partner);
    const [loading, startLoading, stopLoading] = useLoading();

    useEffect(() => {
        const subscription = DataStore.observe(
            SerasaPartnerReport,
            partner.id
        ).subscribe((msg) => {
            setFetchedPartner(msg.element);
        });

        return () => subscription.unsubscribe();
    }, [partner]);

    return (
        <Partner
            partner={fetchedPartner}
            partnerList={partnerList}
            {...{loading, startLoading, stopLoading}}
        />
    );
};

const ReadPartnerReport = ({partners, fileContent}) => {
    const {
        optionalFeatures: {
            partner: {PartnerResponse = {results: []}, partnershipResponse = []}
        }
    } = fileContent;
    const partnerList = [...PartnerResponse.results, ...partnershipResponse];

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
                        {partners.map((partner) => (
                            <PartnerTableRow
                                key={partner.id}
                                partner={partner}
                                partnerList={partnerList}
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
