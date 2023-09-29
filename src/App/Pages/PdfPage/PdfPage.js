const AddressTable = ({ address }) => (
    <table>
        <tbody>
        <tr>
            <th>Address:</th>
            <td>
                {address?.addressLine}, {address?.district}, {address?.city}, {address?.state}, {address?.zipCode}
            </td>
        </tr>
        </tbody>
    </table>
);

const PhoneTable = ({ phone }) => (
    <table>
        <tbody>
        <tr>
            <th>Phone:</th>
            <td>
                +{phone?.regionCode} ({phone?.areaCode}) {phone?.phoneNumber}
            </td>
        </tr>
        </tbody>
    </table>
);

const NegativeDataTable = ({ title, data }) => (
    <table>
        <tbody>
        <tr>
            <th>{title}</th>
        </tr>
        <tr>
            <td>
                <strong>Count:</strong> {data?.summary?.count}
            </td>
        </tr>
        <tr>
            <td>
                <strong>Balance:</strong> {data?.summary?.balance}
            </td>
        </tr>
        </tbody>
    </table>
);

const PersonalReport = ({ registration, score, negativeData, facts }) => (
    <div>
        <h2>Personal Information</h2>
        <table>
            <tbody>
            <tr>
                <th>Document Number:</th>
                <td>{registration?.documentNumber}</td>
            </tr>
            <tr>
                <th>Consumer Name:</th>
                <td>{registration?.consumerName}</td>
            </tr>
            <tr>
                <th>Mother Name:</th>
                <td>{registration?.motherName}</td>
            </tr>
            <tr>
                <th>Birth Date:</th>
                <td>{registration?.birthDate}</td>
            </tr>
            <tr>
                <th>Status Registration:</th>
                <td>{registration?.statusRegistration}</td>
            </tr>
            </tbody>
        </table>

        <AddressTable address={registration?.address} />
        <PhoneTable phone={registration?.phone} />

        <h2>Score</h2>
        <table>
            <tbody>
            <tr>
                <th>Score:</th>
                <td>{score?.score}</td>
            </tr>
            <tr>
                <th>Score Model:</th>
                <td>{score?.scoreModel}</td>
            </tr>
            <tr>
                <th>Default Rate:</th>
                <td>{score?.defaultRate}</td>
            </tr>
            </tbody>
        </table>

        <h2>Negative Data</h2>
        {negativeData &&
            Object.keys(negativeData).map((key) => (
                <NegativeDataTable key={key} title={key} data={negativeData[key]} />
            ))}

        <h2>Facts</h2>
        <table>
            <tbody>
            <tr>
                <th>Judgement Filings Count:</th>
                <td>{facts?.judgementFilings?.summary?.count}</td>
            </tr>
            <tr>
                <th>Bankrupts Count:</th>
                <td>{facts?.bankrupts?.summary?.count}</td>
            </tr>
            </tbody>
        </table>
    </div>
);

const BusinessReport = ({ registration, score, negativeData, facts }) => (
    <div>
        <h2>Business Information</h2>
        <table>
            <tbody>
            <tr>
                <th>Company Document:</th>
                <td>{registration?.companyDocument}</td>
            </tr>
            <tr>
                <th>Company Name:</th>
                <td>{registration?.companyName}</td>
            </tr>
            <tr>
                <th>Foundation Date:</th>
                <td>{registration?.foundationDate}</td>
            </tr>
            <tr>
                <th>Status Registration:</th>
                <td>{registration?.statusRegistration}</td>
            </tr>
            </tbody>
        </table>

        <AddressTable address={registration?.address} />

        <h2>Score</h2>
        <table>
            <tbody>
            <tr>
                <th>Score:</th>
                <td>{score?.score}</td>
            </tr>
            <tr>
                <th>Default Rate:</th>
                <td>{score?.defaultRate}</td>
            </tr>
            <tr>
                <th>Message:</th>
                <td>{score?.message}</td>
            </tr>
            </tbody>
        </table>

        <h2>Negative Data</h2>
        {negativeData &&
            Object.keys(negativeData).map((key) => (
                <NegativeDataTable key={key} title={key} data={negativeData[key]} />
            ))}

        <h2>Facts</h2>
        <table>
            <tbody>
            <tr>
                <th>Judgement Filings Count:</th>
                <td>{facts?.judgementFilings?.summary?.count}</td>
            </tr>
            <tr>
                <th>Bankrupts Count:</th>
                <td>{facts?.bankrupts?.summary?.count}</td>
            </tr>
            </tbody>
        </table>
    </div>
);

const OptionalFeatures = ({ partnerData, directorData }) => (
    <div>
        <h2>Partner Information</h2>
        <table>
            <tbody>
            {partnerData?.map((partner, index) => (
                <tr key={index}>
                    <td>
                        <strong>Business Document:</strong> {partner?.businessDocument},{' '}
                        <strong>Participation Percentage:</strong> {partner?.participationPercentage}%
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

        <h2>Director Information</h2>
        <table>
            <tbody>
            {directorData?.map((director, index) => (
                <tr key={index}>
                    <td>
                        <strong>Document ID:</strong> {director?.documentId}, <strong>Name:</strong> {director?.name},{' '}
                        <strong>Role:</strong> {director?.role}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

const Report = ({ data }) => (
    <div>
        {data.PF && (
            <div>
                <h1>Personal Report</h1>
                <PersonalReport {...data.PF.reports[0]} />
                <OptionalFeatures partnerData={data.PF.optionalFeatures.partner?.partnershipResponse} directorData={data.PF.optionalFeatures.director?.results} />
            </div>
        )}
        {data.PJ && (
            <div>
                <h1>Business Report</h1>
                <BusinessReport {...data.PJ.reports[0]} />
                <OptionalFeatures partnerData={data.PJ.optionalFeatures.partner?.results} directorData={data.PJ.optionalFeatures.director?.results} />
            </div>
        )}
    </div>
);

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
