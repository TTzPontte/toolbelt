const axios = require('axios');

const urls = {
    dev: {
        loginUrl: 'https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login',
        authLogin: 'Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==',
        reportUrl: 'https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport',
        businessReportUrl: 'https://uat-api.serasaexperian.com.br/credit-services/business-information-report/v1/reports'
    },
    prod: {
        loginUrl: 'https://api.serasaexperian.com.br/security/iam/v1/client-identities/login',
        authLogin: 'Basic NjQ4NzA4M2E0ZGU1Y2U0ZTgxZGM4YmNlOmRjYjhjZDE4ZTRlYzVlZDRhMzgwNzg0Ng==',
        reportUrl: 'https://api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport',
        businessReportUrl: 'https://api.serasaexperian.com.br/credit-services/business-information-report/v1/reports'
    }
};

const getToken = async (environment) => {
    const payload = {};
    const headers = {
        'Content-Type': 'application/json',
        Authorization: urls[environment].authLogin
    };

    const response = await axios.post(urls[environment].loginUrl, payload, { headers });
    const { accessToken } = response.data;
    console.log(`Token generated successfully!\n${accessToken}\n\n\n`);
    return accessToken;
};

const generateBusinessReport = async (numDocument, environment) => {
    const reportName = 'PACOTE_BASICO_FINTECH';
    const optionalFeatures = 'QSA';
    const documentId = numDocument;
    const token = await getToken(environment);

    const headers = {
        'X-Document-id': documentId,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };

    const params = {
        reportName: reportName,
        optionalFeatures: optionalFeatures
    };

    try {
        const response = await axios.get(urls[environment].businessReportUrl, { headers, params });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating business report');
    }
};

const generateReport = async (numDocument, environment) => {
    const payload = {
        documentNumber: numDocument,
        reportName: 'COMBO_CONCESSAO_COM_SCORE_FINTECH',
        optionalFeatures: ['PARTICIPACAO_SOCIETARIA']
    };
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken(environment)}`
    };

    try {
        const response = await axios.post(urls[environment].reportUrl, payload, { headers });
        console.log('Data:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating personal report');
    }
};

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const numDocumentLength = event.numDocument.length;
    const environment = event.ambiente;

    const tipoDocumento = (numDocumentLength <= 11) ? 'CPF' : 'CNPJ';

    let response;
    try {
        let resposeSerasa;
        if (event.tipoPessoa === 'PF') {
            console.log('Entering PF request');
            resposeSerasa = await generateReport(event.numDocument, environment);
        } else {
            console.log('Entering PJ request');
            resposeSerasa = await generateBusinessReport(event.numDocument, environment);
        }
        console.log("resposeSerasa", resposeSerasa)

        response = {
            statusCode: 200,
            ambiente: environment,
            tipoPessoa: event.tipoPessoa,
            numeroDocumento: event.numDocument,
            tipoDeDocumento: tipoDocumento,
            response: resposeSerasa
        };
        console.log({response})
    } catch (error) {
        console.error(error);
        // response = {
        // statusCode: 500,
        // error: 'Internal Server Error'
        // };
        response = {
            statusCode: 200,
            ambiente: environment,
            tipoPessoa: event.tipoPessoa,
            numeroDocumento: event.numDocument,
            tipoDeDocumento: tipoDocumento,
            response: {
                "reports": [
                    {
                        "reportName": "COMBO_CONCESSAO_COM_SCORE_FINTECH",
                        "registration": {
                            "documentNumber": "00000197041",
                            "consumerName": "VIVIANE RIOS",
                            "motherName": "afvkp wrpbnvpq kxzyqkcgqbn",
                            "birthDate": "2002-07-19",
                            "statusRegistration": "REGULAR",
                            "address": {
                                "addressLine": "R VIRGEM 716",
                                "district": "JD SATELITE",
                                "zipCode": "12230420",
                                "country": "BRA",
                                "city": "SAO JOSE DOS CAMPOS",
                                "state": "SP"
                            },
                            "phone": {
                                "regionCode": 55,
                                "areaCode": 11,
                                "phoneNumber": 974063008
                            }
                        },
                        "negativeData": {
                            "pefin": {
                                "pefinResponse": [],
                                "summary": {
                                    "count": 0,
                                    "balance": 0
                                }
                            },
                            "refin": {
                                "refinResponse": [],
                                "summary": {
                                    "count": 0,
                                    "balance": 0
                                }
                            },
                            "notary": {
                                "notaryResponse": [],
                                "summary": {
                                    "count": 0,
                                    "balance": 0
                                }
                            },
                            "check": {
                                "checkResponse": [],
                                "summary": {
                                    "count": 0,
                                    "balance": 0
                                }
                            }
                        },
                        "score": {
                            "score": 900,
                            "scoreModel": "HFIN",
                            "defaultRate": "9,0"
                        },
                        "facts": {
                            "inquiry": {
                                "inquiryResponse": [
                                    {
                                        "occurrenceDate": "2023-08-17",
                                        "segmentDescription": "",
                                        "daysQuantity": 1
                                    },
                                    {
                                        "occurrenceDate": "2023-08-02",
                                        "segmentDescription": "",
                                        "daysQuantity": 1
                                    },
                                    {
                                        "occurrenceDate": "2023-05-05",
                                        "segmentDescription": "INDUSTRIA DE INSUMOS",
                                        "daysQuantity": 1
                                    },
                                    {
                                        "occurrenceDate": "2022-12-07",
                                        "segmentDescription": "INDUSTRIA DE INSUMOS",
                                        "daysQuantity": 1
                                    },
                                    {
                                        "occurrenceDate": "2022-12-01",
                                        "segmentDescription": "INDUSTRIA DE INSUMOS",
                                        "daysQuantity": 1
                                    }
                                ],
                                "summary": {
                                    "count": 5
                                }
                            },
                            "stolenDocuments": {
                                "stolenDocumentsResponse": [
                                    {
                                        "occurrenceDate": "2022-07-16",
                                        "inclusionDate": "2022-07-21T09:38:09",
                                        "documentType": "CPF",
                                        "documentNumber": "22053787830",
                                        "issuingAuthority": "SSP",
                                        "detailedReason": "ROUBADO",
                                        "occurrenceState": "SP",
                                        "phoneNumber": {
                                            "regionCode": 55,
                                            "areaCode": 11,
                                            "phoneNumber": 974063008
                                        }
                                    }
                                ],
                                "summary": {
                                    "count": 1,
                                    "balance": 0
                                }
                            }
                        }
                    }
                ],
                "optionalFeatures": {
                    "partner": {
                        "partnershipResponse": [
                            {
                                "businessDocument": "22174039000168",
                                "participationPercentage": 20,
                                "updateDate": "2021-08-05",
                                "participationInitialDate": "2021-07-24"
                            },
                            {
                                "businessDocument": "20198711000120",
                                "participationPercentage": 12.5,
                                "updateDate": "2021-08-05",
                                "participationInitialDate": "2021-08-05"
                            },
                            {
                                "businessDocument": "62173620000180",
                                "participationPercentage": 50,
                                "updateDate": "2022-07-01",
                                "participationInitialDate": "2020-07-01"
                            }
                        ],
                        "summary": {
                            "count": 3,
                            "balance": 0
                        }
                    }
                }
            }}

    }

    return response;
};
