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
module.exports ={urls}
