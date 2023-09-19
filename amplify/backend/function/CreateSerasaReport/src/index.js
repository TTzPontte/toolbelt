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
        response = {
            statusCode: 500,
            error: 'Internal Server Error'
        };
    }

    return response;
};
