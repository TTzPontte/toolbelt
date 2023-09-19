const axios = require('axios');
const urls = {
    test: {
        loginUrl: 'https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login',
        authLogin: 'Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==',
        reportUrl: 'https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport',
        businessReportUrl: 'https://uat-api.serasaexperian.com.br/credit-services/business-information-report/v1/reports'
    },
    production: {
        loginUrl: 'https://api.serasaexperian.com.br/security/iam/v1/client-identities/login',
        authLogin: 'Basic NjQ4NzA4M2E0ZGU1Y2U0ZTgxZGM4YmNlOmRjYjhjZDE4ZTRlYzVlZDRhMzgwNzg0Ng==',
        reportUrl: 'https://api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport',
        businessReportUrl: 'https://api.serasaexperian.com.br/credit-services/business-information-report/v1/reports'
    }
};


const getDocumentType = (numDocumentLength) => numDocumentLength <= 11 ? 'CPF' : 'CNPJ';

const getToken = async (environment) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: urls[environment].authLogin
    };
    const { data: { accessToken } } = await axios.post(urls[environment].loginUrl, {}, { headers });
    return accessToken;
};

const generateReport = async (numDocument, environment, reportUrl, payload) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken(environment)}`
    };
    const { data } = await axios.post(reportUrl, payload, { headers });
    return data;
};

const handler = async (event) => {
    const { numDocument, ambiente, tipoPessoa } = event;
    const environment = ambiente;
    const numDocumentLength = numDocument.length;
    const tipoDocumento = getDocumentType(numDocumentLength);

    let responseSerasa;

    if (tipoPessoa === "PF") {
        const payload = {
            documentNumber: numDocument,
            reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
            optionalFeatures: ["PARTICIPACAO_SOCIETARIA"]
        };
        responseSerasa = await generateReport(numDocument, environment, urls[environment].reportUrl, payload);
    } else {
        const payload = {
            reportName: "PACOTE_BASICO_FINTECH",
            optionalFeatures: "QSA"
        };
        responseSerasa = await generateReport(numDocument, environment, urls[environment].businessReportUrl, payload);
    }

    return {
        statusCode: 200,
        ambiente: environment,
        tipoPessoa,
        numeroDocumento: numDocument,
        tipoDeDocumento: tipoDocumento,
        response: responseSerasa,
    };
};

// Sample main function to run the script
const main = async () => {
    const event = {
        numDocument: "00000197041",
        ambiente: 'test',
        tipoPessoa: 'PF'
    };

    const result = await handler(event);
    console.log(result);
};

main().catch(err => console.error(err));
