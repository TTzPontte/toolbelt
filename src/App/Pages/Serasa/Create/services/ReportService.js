import { Auth } from 'aws-amplify';
import Lambda from 'aws-sdk/clients/lambda';
import { DataStore } from '@aws-amplify/datastore';
import { EntityType, ReportStatus, SerasaReport } from '../../../../../models';
import { createPDF, generateDDPF, generateDDPJ } from '../../../../servicer/novoGeradorPDF/main';

const getEnvironment = async () => {
    return window.location.hostname === 'localhost' ? 'dev' : 'prod';
};

const invokeLambdaFunction = async (functionName, payload) => {
    const credentials = await Auth.currentCredentials();
    const lambda = new Lambda({ region: 'us-east-1', credentials });
    return lambda.invoke({ FunctionName: functionName, Payload: JSON.stringify(payload) }).promise();
};

class ReportService {
    static triggerFetchApiSerasa = async (numDocument, tipoPessoa) => {
        const environment = await getEnvironment();
        const functionName = 'ApiSerasa-serasa';
        const payload = { numDocument, tipoPessoa, ambiente: environment };
        await invokeLambdaFunction(functionName, payload);
    };

    static createNewReport = async (payload) => {
        return await DataStore.save(
            new SerasaReport({
                documentNumber: payload.numDocument,
                pipefyId: payload.idPipefy,
                type: EntityType.PF,
                status: ReportStatus.PROCESSING,
            })
        );
    };

    static updateReportStatus = async (id, status) => {
        const original = await DataStore.query(SerasaReport, id);
        return await DataStore.save(
            SerasaReport.copyOf(original, (updated) => {
                updated.status = status;
            })
        );
    };

    static generatePDF = (responseData, personType) => {
        if (personType === 'PF') {
            const ddPF = generateDDPF(responseData);
            const consumerName = responseData.reports[0].registration.consumerName;
            createPDF(ddPF, consumerName);
        } else {
            const ddPJ = generateDDPJ(responseData);
            const companyName = responseData.reports[0].registration.companyName;
            createPDF(ddPJ, companyName);
        }
    };
}

export default ReportService;
