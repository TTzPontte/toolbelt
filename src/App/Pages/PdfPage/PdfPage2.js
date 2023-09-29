import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    phone: {regionCode: 55, areaCode: 11, phoneNumber: 974063008},
                },
                negativeData: {
                    pefin: {pefinResponse: [], summary: {count: 0, balance: 0}},
                    refin: {refinResponse: [], summary: {count: 0, balance: 0}},
                    notary: {notaryResponse: [], summary: {count: 0, balance: 0}},
                    check: {checkResponse: [], summary: {count: 0, balance: 0}},
                },
                score: {score: 900, scoreModel: "HFIN", defaultRate: "9,0"},
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
                        summary: {count: 5},
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
                        summary: {count: 1, balance: 0},
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
                    summary: {count: 3, balance: 0},
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
                    address: {city: "SANTO ANDRE", state: "SP"},
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
                    refin: {summary: {count: 0, balance: 0.0}},
                    collectionRecords: {summary: {count: 0, balance: 0.0}},
                    check: {summary: {count: 0, balance: 0.0}},
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
                    judgementFilings: {summary: {count: 0, balance: 0.0}},
                    bankrupts: {summary: {count: 0, balance: 0.0}},
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


    return (
        <div style={{ backgroundColor: 'white' }}>
            <header style={{ backgroundColor: 'blue', textAlign: 'center', padding: '10px' }}>
                <h1 style={{ color: 'white' }}>Serasa</h1>
            </header>

            <section>
                <h2>Identificação</h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Razão Social</th>
                        <th>CNPJ</th>
                        <th>Data de Abertura</th>
                        <th>Situação do CNPJ</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Razão Social</td>
                        <td>Placeholder for CNPJ</td>
                        <td>Placeholder for Data de Abertura</td>
                        <td>Placeholder for Situação do CNPJ</td>
                    </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Score</h2>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <th>Score</th>
                            </tr>
                            <tr>
                                <td>830</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <p>Probability of Inadimplência: 7%</p>
                    </div>
                </div>
            </section>

            <section>
                <h2>Dados de negativação</h2>

                {/* Pefin Section */}
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Pefin (Natureza)</th>
                        <th>Valor Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Pefin (Natureza)</td>
                        <td>Placeholder for Valor Total</td>
                    </tr>
                    </tbody>
                </table>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Natureza</th>
                        <th>Credor</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Resumo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Natureza</td>
                        <td>Placeholder for Credor</td>
                        <td>Placeholder for Valor</td>
                        <td>Placeholder for Data</td>
                        <td>Placeholder for Cidade</td>
                        <td>Placeholder for Estado</td>
                        <td>Placeholder for Resumo</td>
                    </tr>
                    </tbody>
                </table>

                {/* Refin Section */}
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Refin (Natureza)</th>
                        <th>Valor Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Refin (Natureza)</td>
                        <td>Placeholder for Valor Total</td>
                    </tr>
                    </tbody>
                </table>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Natureza</th>
                        <th>Credor</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Resumo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Natureza</td>
                        <td>Placeholder for Credor</td>
                        <td>Placeholder for Valor</td>
                        <td>Placeholder for Data</td>
                        <td>Placeholder for Cidade</td>
                        <td>Placeholder for Estado</td>
                        <td>Placeholder for Resumo</td>
                    </tr>
                    </tbody>
                </table>

                {/* Protestos Section */}
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Protestos (Natureza)</th>
                        <th>Valor Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Protestos (Natureza)</td>
                        <td>Placeholder for Valor Total</td>
                    </tr>
                    </tbody>
                </table>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Cartório</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th>Resumo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Cartório</td>
                        <td>Placeholder for Cidade</td>
                        <td>Placeholder for UF</td>
                        <td>Placeholder for Data</td>
                        <td>Placeholder for Valor</td>
                        <td>Placeholder for Resumo</td>
                    </tr>
                    </tbody>
                </table>

                {/* Ação Judicial Section */}
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Ação Judicial (Natureza)</th>
                        <th>Valor Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Ação Judicial (Natureza)</td>
                        <td>Placeholder for Valor Total</td>
                    </tr>
                    </tbody>
                </table>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Natureza</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th>Resumo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for Natureza</td>
                        <td>Placeholder for Cidade</td>
                        <td>Placeholder for UF</td>
                        <td>Placeholder for Data</td>
                        <td>Placeholder for Valor</td>
                        <td>Placeholder for Resumo</td>
                    </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Participação Societária</h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>CPF/CNPJ</th>
                        <th>Sócio</th>
                        <th>Participação</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder for CPF/CNPJ</td>
                        <td>Placeholder for Sócio</td>
                        <td>Placeholder for Participação</td>
                    </tr>
                    </tbody>
                </table>
            </section>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
        </div>
    );
};

export default PdfPage;
