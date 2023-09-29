import React from 'react';
import {Col, Row, Table} from "react-bootstrap";

// Define functional components for rendering data
function DataRow({ label, data }) {
    return (
        <tr>
            <th>{label}:</th>
            <td>{data}</td>
        </tr>
    );
}

function AddressTable({ address }) {
    return (
        <table className={"table table-responsive"}>
            <tbody>
            <DataRow
                label="Address"
                data={`${address?.addressLine}, ${address?.district}, ${address?.city}, ${address?.state}, ${address?.zipCode}`}
            />
            </tbody>
        </table>
    );
}

function PhoneTable({ phone }) {
    return (
        <Table className={"table table-responsive"}>
            <tbody>
            <DataRow
                label="Phone"
                data={`+${phone?.regionCode} (${phone?.areaCode}) ${phone?.phoneNumber}`}
            />
            </tbody>
        </Table>
    );
}

function NegativeDataTable({ title, data }) {
    return (
        <Row responsive striped>
            <Col>
                <th>{title}</th>
            </Col>
            <Col>
                <td>
                    <strong>Count:</strong> {data?.summary?.count}
                </td>
            </Col>
            <Col>
                <td>
                    <strong>Balance:</strong> {data?.summary?.balance}
                </td>
            </Col>
        </Row>
    );
}

function ReportSection({ title, rows }) {
    return (
        <div>
            <h2>{title}</h2>
            <Table responsive striped>
                <tbody>
                {rows.map(({ label, data }, index) => (
                    <DataRow key={index} label={label} data={data} />
                ))}
                </tbody>
            </Table>
        </div>
    );
}

function OptionalFeatures({ data, title }) {
    return (
        <div>
            <h2>{title}</h2>
            <table className={"table table-responsive"}>
                <tbody>
                {data?.map((item, index) => (
                    <DataRow
                        key={index}
                        label={`${item.businessDocument} / ${item.participationPercentage}%`}
                        data={`Update Date: ${item.updateDate}, Initial Date: ${item.participationInitialDate}`}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}

function Report({ data }) {
    const { PF, PJ } = data;

    return (
        <div className={"container"}>
            {PF && (
                <div>
                    <h1>Personal Report</h1>
                    <ReportSection title="Personal Information" rows={[
                        { label: 'Document Number', data: PF.reports[0].registration?.documentNumber },
                        { label: 'Consumer Name', data: PF.reports[0].registration?.consumerName },
                        { label: 'Mother Name', data: PF.reports[0].registration?.motherName },
                        { label: 'Birth Date', data: PF.reports[0].registration?.birthDate },
                        { label: 'Status Registration', data: PF.reports[0].registration?.statusRegistration },
                    ]} />
                    <AddressTable address={PF.reports[0].registration?.address} />
                    <PhoneTable phone={PF.reports[0].registration?.phone} />
                    <ReportSection title="Score" rows={[
                        { label: 'Score', data: PF.reports[0].score?.score },
                        { label: 'Score Model', data: PF.reports[0].score?.scoreModel },
                        { label: 'Default Rate', data: PF.reports[0].score?.defaultRate },
                    ]} />
                    <h2>Negative Data</h2>
                    {Object.keys(PF.reports[0].negativeData).map((key) => (
                        <NegativeDataTable key={key} title={key} data={PF.reports[0].negativeData[key]} />
                    ))}
                    <ReportSection title="Facts" rows={[
                        { label: 'Judgement Filings Count', data: PF.reports[0].facts?.inquiry?.summary?.count },
                        { label: 'Bankrupts Count', data: PF.reports[0].facts?.stolenDocuments?.summary?.count },
                    ]} />
                    <OptionalFeatures data={PF.optionalFeatures.partner?.partnershipResponse} title="Partner Information" />
                    <OptionalFeatures data={PF.optionalFeatures.director?.results} title="Director Information" />
                </div>
            )}

            {PJ && (
                <div>
                    <h1>Business Report</h1>
                    <ReportSection title="Business Information" rows={[
                        { label: 'Company Document', data: PJ.reports[0].registration?.companyDocument },
                        { label: 'Company Name', data: PJ.reports[0].registration?.companyName },
                        { label: 'Foundation Date', data: PJ.reports[0].registration?.foundationDate },
                        { label: 'Status Registration', data: PJ.reports[0].registration?.statusRegistration },
                    ]} />
                    <AddressTable address={PJ.reports[0].registration?.address} />
                    <ReportSection title="Score" rows={[
                        { label: 'Score', data: PJ.reports[0].score?.score },
                        { label: 'Default Rate', data: PJ.reports[0].score?.defaultRate },
                        { label: 'Message', data: PJ.reports[0].score?.message },
                    ]} />
                    <h2>Negative Data</h2>
                    {Object.keys(PJ.reports[0].negativeData).map((key) => (
                        <NegativeDataTable key={key} title={key} data={PJ.reports[0].negativeData[key]} />
                    ))}
                    <ReportSection title="Facts" rows={[
                        { label: 'Judgement Filings Count', data: PJ.reports[0].facts?.judgementFilings?.summary?.count },
                        { label: 'Bankrupts Count', data: PJ.reports[0].facts?.bankrupts?.summary?.count },
                    ]} />
                    <OptionalFeatures data={PJ.optionalFeatures.partner?.results} title="Partner Information" />
                    <OptionalFeatures data={PJ.optionalFeatures.director?.results} title="Director Information" />
                </div>
            )}
        </div>
    );
}

const PdfPage = () => {
    const data = {
        PF: {
            reports: [{
                reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
                registration: {
                    documentNumber: "00000197041",
                    consumerName: "VIVIANE RIOS",
                    motherName: "afvkp wrpbnvpq kxzyqkcgqbn",
                    birthDate: "2002-07-19",
                    statusRegistration: "REGULAR",
                    address: {
                        addressLine: "R VIRGEM 716",
                        district: "JD SATELITE",
                        zipCode: "12230420",
                        country: "BRA",
                        city: "SAO JOSE DOS CAMPOS",
                        state: "SP",
                    },
                    phone: { regionCode: 55, areaCode: 11, phoneNumber: 974063008 },
                },
                negativeData: {
                    pefin: { pefinResponse: [], summary: { count: 0, balance: 0 } },
                    refin: { refinResponse: [], summary: { count: 0, balance: 0 } },
                    notary: { notaryResponse: [], summary: { count: 0, balance: 0 } },
                    check: { checkResponse: [], summary: { count: 0, balance: 0 } },
                },
                score: { score: 900, scoreModel: "HFIN", defaultRate: "9,0" },
                facts: {
                    inquiry: {
                        inquiryResponse: [
                            {
                                occurrenceDate: "2023-08-17",
                                segmentDescription: "",
                                daysQuantity: 1,
                            },
                            {
                                occurrenceDate: "2023-08-02",
                                segmentDescription: "",
                                daysQuantity: 1,
                            },
                            {
                                occurrenceDate: "2023-05-05",
                                segmentDescription: "INDUSTRIA DE INSUMOS",
                                daysQuantity: 1,
                            },
                            {
                                occurrenceDate: "2022-12-07",
                                segmentDescription: "INDUSTRIA DE INSUMOS",
                                daysQuantity: 1,
                            },
                            {
                                occurrenceDate: "2022-12-01",
                                segmentDescription: "INDUSTRIA DE INSUMOS",
                                daysQuantity: 1,
                            },
                        ],
                        summary: { count: 5 },
                    },
                    stolenDocuments: {
                        stolenDocumentsResponse: [
                            {
                                occurrenceDate: "2022-07-16",
                                inclusionDate: "2022-07-21T09:38:09",
                                documentType: "CPF",
                                documentNumber: "22053787830",
                                issuingAuthority: "SSP",
                                detailedReason: "ROUBADO",
                                occurrenceState: "SP",
                                phoneNumber: {
                                    regionCode: 55,
                                    areaCode: 11,
                                    phoneNumber: 974063008,
                                },
                            },
                        ],
                        summary: { count: 1, balance: 0 },
                    },
                },
            }],
            optionalFeatures: {
                partner: {
                    partnershipResponse: [
                        {
                            businessDocument: "22174039000168",
                            participationPercentage: 20,
                            updateDate: "2021-08-05",
                            participationInitialDate: "2021-07-24",
                        },
                        {
                            businessDocument: "20198711000120",
                            participationPercentage: 12.5,
                            updateDate: "2021-08-05",
                            participationInitialDate: "2021-08-05",
                        },
                        {
                            businessDocument: "62173620000180",
                            participationPercentage: 50,
                            updateDate: "2022-07-01",
                            participationInitialDate: "2020-07-01",
                        },
                    ],
                    summary: { count: 3, balance: 0 },
                },
            },
        },
        PJ: {
            reports: [{
                reportName: "PACOTE_BASICO_FINTECH",
                registration: {
                    companyDocument: "30485778000107",
                    companyName: "ADVANCE3 INCORPORADORA E CONSTRUTORA LTDA. - EPP",
                    foundationDate: "2018-05-17",
                    statusRegistration: "SITUA\u00c7\u00c3O DO CNPJ EM 07/08/2023 : ATIVA",
                    address: { city: "SANTO ANDRE", state: "SP" },
                },
                negativeData: {
                    pefin: {
                        pefinResponse: [
                            {
                                occurrenceDate: "2023-02-25",
                                legalNatureId: "DP",
                                legalNature: "DUPLICATA",
                                contractId: "17822302RI060090",
                                creditorName: "OTIS",
                                amount: 858.15,
                                principal: true,
                            },
                        ],
                        summary: {
                            firstOccurrence: "2023-02-25",
                            lastOccurrence: "2023-02-25",
                            count: 1,
                            balance: 858.15,
                        },
                    },
                    refin: { summary: { count: 0, balance: 0.0 } },
                    collectionRecords: { summary: { count: 0, balance: 0.0 } },
                    check: { summary: { count: 0, balance: 0.0 } },
                    notary: {
                        notaryResponse: [
                            {
                                occurrenceDate: "2023-02-01",
                                amount: 7361.31,
                                officeNumber: "UN",
                                city: "SANTO ANDRE",
                                federalUnit: "SP",
                            },
                            {
                                occurrenceDate: "2023-01-02",
                                amount: 7352.48,
                                officeNumber: "UN",
                                city: "SANTO ANDRE",
                                federalUnit: "SP",
                            },
                            {
                                occurrenceDate: "2022-12-05",
                                amount: 1656.34,
                                officeNumber: "UN",
                                city: "SANTO ANDRE",
                                federalUnit: "SP",
                            },
                            {
                                occurrenceDate: "2022-12-05",
                                amount: 1535.39,
                                officeNumber: "UN",
                                city: "SANTO ANDRE",
                                federalUnit: "SP",
                            },
                            {
                                occurrenceDate: "2022-12-03",
                                amount: 7352.48,
                                officeNumber: "UN",
                                city: "SANTO ANDRE",
                                federalUnit: "SP",
                            },
                        ],
                        summary: {
                            firstOccurrence: "2022-12-03",
                            lastOccurrence: "2023-02-01",
                            count: 5,
                            balance: 25258.0,
                        },
                    },
                },
                facts: {
                    judgementFilings: { summary: { count: 0, balance: 0.0 } },
                    bankrupts: { summary: { count: 0, balance: 0.0 } },
                },
                score: {
                    score: 2,
                    defaultRate: "10000",
                    message: "DEFAULT - CESTA DE EVENTOS RELEVANTES",
                },
            }],
            optionalFeatures: {
                partner: {
                    results: [
                        {
                            documentId: "07724736847",
                            name: "KATIA HIROMI SASSAQUI",
                            participationPercentage: 33.4,
                            inconsistent: false,
                            hasNegative: false,
                        },
                        {
                            documentId: "15520984867",
                            name: "EDUARDO DIAS",
                            participationPercentage: 33.3,
                            inconsistent: false,
                            hasNegative: true,
                        },
                        {
                            documentId: "27027468883",
                            name: "TONY INACIO DE BARROS",
                            participationPercentage: 33.3,
                            inconsistent: false,
                            hasNegative: true,
                        },
                    ],
                },
                director: {
                    results: [
                        {
                            documentId: "07724736847",
                            name: "KATIA HIROMI SASSAQUI",
                            role: "ADMINISTRADOR",
                            hasNegative: false,
                        },
                        {
                            documentId: "15520984867",
                            name: "EDUARDO DIAS",
                            role: "ADMINISTRADOR",
                            hasNegative: true,
                        },
                        {
                            documentId: "27027468883",
                            name: "TONY INACIO DE BARROS",
                            role: "ADMINISTRADOR",
                            hasNegative: true,
                        },
                    ],
                },
            },
        },
    };

    return <Report data={data} />;
};

export default PdfPage;
