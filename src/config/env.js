
const REACT_APP = /^REACT_APP_/i;
const { REACT_APP_STAGE } = process.env;

const env = Object.keys(process.env)
  .filter(key => REACT_APP.test(key))
  .reduce((env, key) => {
    env[key] = process.env[key];
    return env;
  }, {
    SERASA_REPORT_LAMBDA: getLambdaValue('SerasaReport', REACT_APP_STAGE),
    SERASA_PARTNER_REPORT_LAMBDA: getLambdaValue('SerasaPartnerReport', REACT_APP_STAGE),
    PREDICTUS_REPORT_LAMBDA: getLambdaValue('PredictusReport', REACT_APP_STAGE),
    // Add more lambdas as needed
  });

function getLambdaValue(lambdaName, stage) {
  const lambdaConfigurations = {
    prod: {
      SerasaReport: 'pontte-toolbelt-backend-serasa-CreateReportFn',
      SerasaPartnerReport: 'pontte-toolbelt-backend-serasa-CreatePartnerReportFn',
      PredictusReport: 'pontte-toolbelt-backend-predictus-CreateReportFn',
    },
    staging: {
      SerasaReport: 'pontte-toolbelt-backend-serasa-CreateReportFn-staging',
      SerasaPartnerReport: 'pontte-toolbelt-backend-serasa-CreatePartnerReportFn-staging',
      PredictusReport: 'pontte-toolbelt-backend-predictus-CreateReportFn-staging',
    },
    dev: {
      SerasaReport: 'pontte-toolbelt-backend-serasa-CreateReportFn-dev',
      SerasaPartnerReport: 'pontte-toolbelt-backend-serasa-CreatePartnerReportFn-dev',
      PredictusReport: 'pontte-toolbelt-backend-predictus-CreateReportFn-dev',
    },
    // Add more environments and lambdas as needed
  };

  return lambdaConfigurations[stage]?.[lambdaName] || '';
}

export default env ;