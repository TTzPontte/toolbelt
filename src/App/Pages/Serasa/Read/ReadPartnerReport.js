import React from "react";
import { Card, Container, Table } from "react-bootstrap";
import CreatePartnerButton from "./CreatePartnerButton";
const Partner=({combinedPartners})=>{
    console.log({combinedPartners})
    return(
        <>
            {combinedPartners.length > 0 && (
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
                                    <td>{partner?.status || '-'}</td>
                                    <td>{partner?.filePath || '-'}</td>
                                    <td>
                                        <CreatePartnerButton partner={partner} />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}</>
    )
}
const ReadPartnerReport = ({ partners, fileContent }) => {
    const {
        optionalFeatures: {
            partner: { PartnerResponse = { results: [] }, partnershipResponse = [] },
        },
    } = fileContent;

    const partnerList = [...PartnerResponse.results, ...partnershipResponse];

    // Combine partner data
    const combinePartners = () => {
        return partners.map((partner) => {
            const document_key = partner.type === 'PF' ? "businessDocument" : "documentId";
            const response = partnerList.find(
                (r) => r[document_key] === partner.documentNumber
            );

            return response
                ? {
                    ...partner,
                    participationPercentage: response.participationPercentage,
                    updateDate: response.updateDate,
                    participationInitialDate: response.participationInitialDate,
                }
                : partner;
        });
    };

    const combinedPartners = combinePartners();

    return (
        <Container>
            <Partner combinedPartners={combinedPartners}/>
        </Container>
    );
};

export default ReadPartnerReport;
