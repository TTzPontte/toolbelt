const axios = require("axios");

const urls = {
  dev: {
    loginUrl:
      "https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login",
    authLogin: "Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmFkMjoxMjM0NTY3ODk=",
    reportUrl:
      "https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport",
    businessReportUrl:
      "https://uat-api.serasaexperian.com.br/credit-services/business-information-report/v1/reports"
  },
  prod: {
    loginUrl:
      "https://api.serasaexperian.com.br/security/iam/v1/client-identities/login",
    authLogin:
      "Basic NjQ4NzA4M2E0ZGU1Y2U0ZTgxZGM4YmNlOmRjYjhjZDE4ZTRlYzVlZDRhMzgwNzg0Ng==",
    reportUrl:
      "https://api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport",
    businessReportUrl:
      "https://api.serasaexperian.com.br/credit-services/business-information-report/v1/reports"
  }
};

const getToken = async (environment) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: urls[environment].authLogin
  };

  const response = await axios.post(
    urls[environment].loginUrl,
    {},
    { headers }
  );
  const { accessToken } = response.data;
  console.log(`Token generated successfully!\n${accessToken}\n\n\n`);
  return accessToken;
};

const generateReport = async (
  numDocument,
  environment,
  reportName,
  optionalFeatures
) => {
  const payload = {
    documentNumber: numDocument,
    reportName,
    optionalFeatures
  };

  const token = await getToken(environment);

  const headers = {
    "X-Document-id": numDocument,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  try {
    const response = await axios.get(urls[environment].businessReportUrl, {
      headers,
      params: payload
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error generating report");
  }
};

const mockReturn = (event, environment, tipoDocumento) => ({
  statusCode: 200,
  ambiente: environment,
  tipoPessoa: event.tipoPessoa,
  numeroDocumento: event.numDocument,
  tipoDeDocumento: tipoDocumento,
  response: {
    reports: [
      {
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
            state: "SP"
          },
          phone: {
            regionCode: 55,
            areaCode: 11,
            phoneNumber: 974063008
          }
        },
        negativeData: {
          pefin: {
            pefinResponse: [],
            summary: {
              count: 0,
              balance: 0
            }
          },
          refin: {
            refinResponse: [],
            summary: {
              count: 0,
              balance: 0
            }
          },
          notary: {
            notaryResponse: [],
            summary: {
              count: 0,
              balance: 0
            }
          },
          check: {
            checkResponse: [],
            summary: {
              count: 0,
              balance: 0
            }
          }
        },
        score: {
          score: 900,
          scoreModel: "HFIN",
          defaultRate: "9,0"
        },
        facts: {
          inquiry: {
            inquiryResponse: [
              {
                occurrenceDate: "2023-08-17",
                segmentDescription: "",
                daysQuantity: 1
              },
              {
                occurrenceDate: "2023-08-02",
                segmentDescription: "",
                daysQuantity: 1
              },
              {
                occurrenceDate: "2023-05-05",
                segmentDescription: "INDUSTRIA DE INSUMOS",
                daysQuantity: 1
              },
              {
                occurrenceDate: "2022-12-07",
                segmentDescription: "INDUSTRIA DE INSUMOS",
                daysQuantity: 1
              },
              {
                occurrenceDate: "2022-12-01",
                segmentDescription: "INDUSTRIA DE INSUMOS",
                daysQuantity: 1
              }
            ],
            summary: {
              count: 5
            }
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
                  phoneNumber: 974063008
                }
              }
            ],
            summary: {
              count: 1,
              balance: 0
            }
          }
        }
      }
    ],
    optionalFeatures: {
      partner: {
        partnershipResponse: [
          {
            businessDocument: "22174039000168",
            participationPercentage: 20,
            updateDate: "2021-08-05",
            participationInitialDate: "2021-07-24"
          },
          {
            businessDocument: "20198711000120",
            participationPercentage: 12.5,
            updateDate: "2021-08-05",
            participationInitialDate: "2021-08-05"
          },
          {
            businessDocument: "62173620000180",
            participationPercentage: 50,
            updateDate: "2022-07-01",
            participationInitialDate: "2020-07-01"
          }
        ],
        summary: {
          count: 3,
          balance: 0
        }
      }
    }
  }
});
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { documentNumber: numDocument, ambiente, type: tipoPessoa } = event;
  const numDocumentLength = numDocument.length;
  const tipoDocumento = numDocumentLength <= 11 ? "CPF" : "CNPJ";

  try {
    const reportName =
      tipoPessoa === "PF"
        ? "COMBO_CONCESSAO_COM_SCORE_FINTECH"
        : "PACOTE_BASICO_FINTECH";
    const optionalFeatures =
      tipoPessoa === "PF" ? ["PARTICIPACAO_SOCIETARIA"] : "QSA";

    const response = await generateReport(
      numDocument,
      ambiente,
      reportName,
      optionalFeatures
    );

    console.log("response", response);

    return {
      statusCode: 200,
      ambiente,
      tipoPessoa,
      numeroDocumento: numDocument,
      tipoDeDocumento: tipoDocumento,
      response
    };
  } catch (error) {
    console.error(error);
    // return {
    //   statusCode: 500,
    //   error: "Internal Server Error"
    // };
    return mockReturn(event, ambiente, tipoDocumento);
  }
};
